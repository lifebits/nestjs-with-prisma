import { DBConnectorModule } from '@core/db-connector';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DBConnectorModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
