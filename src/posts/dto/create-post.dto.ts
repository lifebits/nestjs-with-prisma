import { OmitType, PartialType } from '@nestjs/mapped-types';
// import { Post } from '../entities/post.entity';
import { PostDto } from './post.dto';

export class CreatePostDto extends OmitType(PostDto, ['id', 'createdAt']) {
  constructor(data: CreatePostDto) {
    super();
    Object.assign(this, data);
  }
}

export class CreateTestedPostDto extends OmitType(PostDto, ['createdAt']) {
  constructor(data: CreateTestedPostDto) {
    super();
    Object.assign(this, data);
  }
}
