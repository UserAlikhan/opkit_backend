import { applyDecorators, UseGuards } from "@nestjs/common";
import { TaskOwnerGuard } from "../guards/task-owner.guard";

export function TaskOwner() {
    return applyDecorators(
        UseGuards(TaskOwnerGuard)
    )
}