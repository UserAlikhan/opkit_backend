import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

// Проверяет принадлежит ли task пользователю
@Injectable()
export class TaskOwnerGuard implements CanActivate {
    constructor(private prismaService: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()

        const userId = req.user.userId
        const taskId = Number(req.params.id)

        const task = await this.prismaService.task.findUnique({
            where: { id: taskId }
        })

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (task.userId !== userId) {
            throw new ForbiddenException();
        }

        req.task = task

        return true
    }
}