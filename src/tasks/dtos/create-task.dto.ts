import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "generated/prisma/enums";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: "Title cannot be empty!" })
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus
}