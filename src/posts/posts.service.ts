import { PrismaService } from '@core/db-connector';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { concatAll, forkJoin, map, Observable, switchMap, tap, toArray } from 'rxjs';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { OutsidePost, Post } from './entities/post.entity';
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

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  findOne(id: number): Promise<Post> {
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
        map(post => new CreatePostDto({
          authorId: post.userId,
          content: post.body,
          title: post.title,
          published: false
        })),
        toArray(),
        switchMap(postList => {
          return this.prisma.post.createMany({
            data: postList
          })
        })
      );
  }
}
