import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength, IsEmail } from 'class-validator';

import { PostDto } from '../../posts/dto/post.dto';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name field require minimum length 3' })
  @MaxLength(12, { message: 'Name field required maximum length 12' })
  name: string | null;

  @ApiPropertyOptional()
  birthday: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({ type: PostDto, isArray: true })
  posts?: Array<PostDto>;

  constructor(data: UserDto) {
    Object.assign(this, data);
  }
}
