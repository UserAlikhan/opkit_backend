import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        private prismaService: PrismaService,
    ) {}

    async findAll(userId: number) {
        return await this.prismaService.task.findMany({
            where: { userId: userId }
        })
    }

    async create(userId: number, dto: CreateTaskDto) {
        return await this.prismaService.task.create({
            data: {
                ...dto,
                userId: userId,
            }
        })
    }

    async update(taskId: number, dto: UpdateTaskDto) {
        return await this.prismaService.task.update({
            where: { id: taskId },
            data: dto,
        })
    }

    async remove(taskId: number) {
        return await this.prismaService.task.delete({ 
            where: { id: taskId } 
        })
    }
}