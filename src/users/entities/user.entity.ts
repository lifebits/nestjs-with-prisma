import { User as UserDBModel } from '@prisma/client';
import { Post } from '../../posts/entities/post.entity';

export class User implements UserDBModel {
  readonly id: number;
  email: string;
  name: string | null;
  birthday;
  createdAt;
  // posts: Post[];
}
