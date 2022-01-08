import { User as UserDBModel } from '@prisma/client';

export class User implements UserDBModel {
  id: number;
  email: string;
  name: string | null;
}
