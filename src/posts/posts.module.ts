import { DBConnectorModule } from '@core/db-connector';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [DBConnectorModule, HttpModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
