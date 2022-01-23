import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserRequestDto extends OmitType(UserDto, ['id', 'posts']) {
  constructor(data: CreateUserRequestDto) {
    super(data);
  }
}

export class CreateUserResponseDto extends UserDto {
  constructor(data: CreateUserResponseDto) {
    super(data);
  }
}
