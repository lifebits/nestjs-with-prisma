export class PostDto {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: Date | null;
  authorId: number;
}
