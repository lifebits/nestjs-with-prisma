import { Post as PostDBModel } from '@prisma/client';

export class Post implements PostDBModel {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: Date | null;
  authorId: number;
}
