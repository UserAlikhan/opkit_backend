import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskOwnerGuard } from './guards/task-owner.guard';
import { TasksGateway } from './tasks.gateway';
import { RedisService } from 'src/redis/redis.service';

@Module({
  providers: [
    TasksService, PrismaService, TaskOwnerGuard, 
    TasksGateway, RedisService
  ],
  controllers: [TasksController]
})
export class TasksModule {}
