import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ErrorsInterceptor } from '@core/errors.interceptor';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [UsersModule, PostsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    }
  ],
})
export class AppModule {}
