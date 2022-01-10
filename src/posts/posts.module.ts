import { DBConnectorModule } from '@core/db-connector';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [DBConnectorModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
