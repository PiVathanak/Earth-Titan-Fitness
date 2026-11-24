import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BranchesModule } from './branches/branches.module.js';

@Module({
  imports: [BranchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
