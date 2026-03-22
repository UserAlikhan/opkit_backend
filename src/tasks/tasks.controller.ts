import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import type { RequestWithUser } from './types/express';
import { TaskOwner } from './decorators/task-owner.decorator';
import { UpdateTaskDto } from './dtos/update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) {}

    @Get()
    async getTasks(@Req() req: RequestWithUser) {
        return await this.tasksService.findAll(req.user.userId)
    }

    @Post()
    async createTask(@Req() req: RequestWithUser, @Body() dto: CreateTaskDto) {
        return await this.tasksService.create(req.user.userId, dto)
    }

    @TaskOwner()
    @Patch(":id")
    async updateTask(@Param("id") id: string, @Body() dto: UpdateTaskDto) {
        return await this.tasksService.update(Number(id), dto)
    }

    @TaskOwner()
    @Delete(":id")
    async deleteTask(@Param("id") id: string) {
        return await this.tasksService.remove(Number(id))
    }
}
