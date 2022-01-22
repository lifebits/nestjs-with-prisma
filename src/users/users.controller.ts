import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

import { CreateUserRequestDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UpdateUserRequestDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserResponseDto,
  })
  create(@Body() createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CreateUserResponseDto})
  findOne(@Param('id') id: string): Promise<any> {
    // return this.usersService.findOne(+id);
    return this.usersService.finsOneWithPosts(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserRequestDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
