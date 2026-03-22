import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskOwnerGuard } from './guards/task-owner.guard';
import { TasksGateway } from './tasks.gateway';

@Module({
  providers: [TasksService, PrismaService, TaskOwnerGuard, TasksGateway],
  controllers: [TasksController]
})
export class TasksModule {}
