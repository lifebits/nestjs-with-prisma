import { OmitType } from '@nestjs/mapped-types';
import { Post } from '../entities/post.entity';

export class CreatePostDto extends OmitType(Post, ['id', 'createdAt']) {
  constructor(data: CreatePostDto) {
    super();
    Object.assign(this, data);
  }
}
