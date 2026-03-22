import { IsEnum, IsOptional, IsString, IsNotEmpty } from "class-validator";
import { TaskStatus } from "generated/prisma/enums";

// Dto для валидации данных для изменения task
export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: "Title cannot be empty!" })
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}