import { PrismaService } from '@core/db-connector';
import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.prisma.user.create({
      data: createUserDto
    })
      .then((model: User) => new CreateUserResponseDto(model));
  }

  findAll(): Promise<UserDto[]> {
    return this.prisma.user.findMany()
      .then(array => array.map(a => new UserDto(a)));
  }

  findOne(id: number): Promise<UserDto> {
    return this.prisma.user.findUnique({
      where: { id: id }
    })
      .then((model: User) => new UserDto(model))
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
