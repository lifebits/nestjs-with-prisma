import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name field require minimum length 3' })
  name: string | null;

  @ApiPropertyOptional()
  comment?: string;

  constructor(data: CreateUserRequestDto) {
    Object.assign(this, data);
  }
}

export class CreateUserResponseDto extends CreateUserRequestDto {
  @ApiProperty()
  id: number;

  constructor(data: CreateUserResponseDto) {
    super(data);
  }
}
