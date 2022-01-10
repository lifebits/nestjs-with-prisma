import { PrismaService } from '@core/db-connector';
import { Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {

  constructor(private prisma: PrismaService) {}

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

  update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.prisma.post.update({
      where: { id: id },
      data: updatePostDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
