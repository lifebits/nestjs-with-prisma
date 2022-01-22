import { PrismaService } from '@core/db-connector';
import { Injectable } from '@nestjs/common';

import { PostsService } from '../posts/posts.service';

import { User } from './entities/user.entity';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService/*, private posts: PostsService*/) {}

  create(createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.prisma.user.create({
      data: createUserDto
    })
      .then((model: User) => {
        return new CreateUserResponseDto(model);
      });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<CreateUserResponseDto> {
    let result: CreateUserResponseDto;
    return this.prisma.user.findUnique({
      where: { id: id }
    })
      .then((model: User) => {
        return new CreateUserResponseDto(model);
      })
      // .then((model: CreateUserDtoResponse) => {
      //
      // });
  }

  finsOneWithPosts(userId: number) {
    return this.prisma.user.findMany({
      where: { id: userId },
      include: {
        posts: true,
      },
    });
  }

  update(id: number, updateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id
      }
    });
  }
}
