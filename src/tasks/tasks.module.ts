import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskOwnerGuard } from './guards/task-owner.guard';

@Module({
  providers: [TasksService, PrismaService, TaskOwnerGuard],
  controllers: [TasksController]
})
export class TasksModule {}
