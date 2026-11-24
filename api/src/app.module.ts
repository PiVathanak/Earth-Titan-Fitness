import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BranchesModule } from './branches/branches.module.js';
import { MembershipsModule } from './memberships/memberships.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [BranchesModule, UsersModule, MembershipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
