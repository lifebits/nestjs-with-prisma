import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

import { UserDto } from './dto/user.dto';
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
  @ApiResponse({ status: 400, description: 'There is a unique constraint violation' })
  create(@Body() createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Test description',
    type: UserDto,
    isArray: true
  })
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto, isArray: true })
  findOne(@Param('id') id: string): Promise<UserDto[]> {
    return this.usersService.findOneWithPosts(+id);
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
