import { PrismaService } from '@core/db-connector';
import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    const asd = this.prisma.user.findUnique({
      where: { id: id }
    });
    console.log(asd);
    return asd;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
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
