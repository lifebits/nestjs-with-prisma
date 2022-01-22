import { ApiProperty } from '@nestjs/swagger';
import { CreateUserResponseDto } from './create-user.dto';

export class UpdateUserRequestDto extends CreateUserResponseDto {
  @ApiProperty()
  name: string
}
