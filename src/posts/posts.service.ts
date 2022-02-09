import { PrismaService } from '@core/db-connector';
import { TEST_POST_IDS, TEST_POST_MAX_LENGTH } from '@core//constants';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { concatAll, forkJoin, map, Observable, of, reduce, switchMap, tap, toArray } from 'rxjs';

import { CreatePostDto, CreateTestedPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { OutsidePost, Post } from './entities/post.entity';
import { catchError } from 'rxjs/operators';
import { PostDto } from './dto/post.dto';

function randomInteger(min: number, max: number): number {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

@Injectable()
export class PostsService {

  constructor(private prisma: PrismaService, private http: HttpService) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: createPostDto
    });
  }

  findAll(): Promise<PostDto[]> {
    return this.prisma.post.findMany();
  }

  findOne(id: number): Promise<PostDto> {
    return this.prisma.post.findUnique({
      where: { id: id }
    });
  }

  findAllByUserId(userId: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { authorId: userId }
    });
  }

  update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.prisma.post.update({
      where: { id: id },
      data: updatePostDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  removeAll() {
    return this.prisma.post.deleteMany();
  }

  generatePosts(): Observable<any> {
    return forkJoin([
      this.http.get<OutsidePost[]>('https://jsonplaceholder.typicode.com/posts').pipe(
        map(response => response.data)
      ),
      this.prisma.user.findMany()
    ])
      .pipe(
        map(([posts, users]) => {
          return posts.map(post => {
            const randomUser = users[randomInteger(0, users.length - 1)];
            post.userId = randomUser.id;
            return post;
          });
        }),
        concatAll(),
        reduce((acc, post, i) => {
          acc.push(new CreateTestedPostDto({
            id: TEST_POST_IDS[i],
            authorId: post.userId,
            content: post.body,
            title: post.title,
            published: !!randomInteger(0, 1),
          }))
          return acc;
        }, []),
        map(post => post.slice(0, TEST_POST_MAX_LENGTH)),
        switchMap(postDtoList => {
          return this.prisma.post.createMany({
            data: postDtoList,
          })
        }),
        catchError(() => {
          return of({ message: 'Test posts already exist' });
        })
      );
  }
}
