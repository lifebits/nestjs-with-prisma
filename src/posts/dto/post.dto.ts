import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string | null;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date | null;

  authorId: number;

  constructor(data: PostDto) {
    Object.assign(this, data);
  }
}
