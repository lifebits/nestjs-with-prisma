import { Injectable, OnModuleDestroy, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

export const asd = 123;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('', async () => {
  //     await app.close();
  //   });
  // }
}
