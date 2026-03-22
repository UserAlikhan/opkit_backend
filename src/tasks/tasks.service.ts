import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksGateway } from './tasks.gateway';
import { RedisService } from 'src/redis/redis.service';
import { TaskType } from './types/express';

@Injectable()
export class TasksService {
    constructor(
        private prismaService: PrismaService,
        private tasksGateway: TasksGateway,
        private redisService: RedisService,
    ) {}

    async findAll(userId: number) {
        const cacheKey = `tasks:${userId}`
        const cached = await this.redisService.get(cacheKey)
       
        // вернуть данные из кэша если есть
        if (cached) { return cached }

        const tasks: TaskType[] = await this.prismaService.task.findMany({
            where: { userId: userId }
        })

        // добавить данные в кэш на 5 минут
        await this.redisService.set(cacheKey, tasks, 60*5)

        return tasks
    }

    async create(userId: number, dto: CreateTaskDto) {
        const task = await this.prismaService.task.create({
            data: {
                ...dto,
                userId: userId,
            }
        })

        if (!task) return

        const cacheKey = `tasks:${userId}`

        // сброс кэша
        await this.redisService.del(cacheKey);

        // отправляем событие о новой задаче
        this.tasksGateway.sendTaskCreated(task)

        return task
    }

    async update(taskId: number, dto: UpdateTaskDto) {
        const task = await this.prismaService.task.update({
            where: { id: taskId },
            data: dto,
        })

        if (!task) return

        const cacheKey = `tasks:${task.userId}`

        // сброс кэша
        await this.redisService.del(cacheKey);

        // отправляем событие об измененной задаче
        if (dto.status) {
            this.tasksGateway.sendTaskStatusUpdate(task)
        }

        return task
    }

    async remove(taskId: number) {
        const task = await this.prismaService.task.delete({ 
            where: { id: taskId } 
        })

        if (!task) return

        const cacheKey = `tasks:${task.userId}`

        // сброс кэша
        await this.redisService.del(cacheKey);

        // отправляем событие об удаление задаче
        this.tasksGateway.sendTaskDeleted(taskId)

        return task
    }
}