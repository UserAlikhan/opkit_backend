import { Request } from "@nestjs/common"

export interface RequestWithUser extends Request {
    user : {
        userId: number
        email: string
    }
}

export type TaskType = {
    id: number
    title: string
    description: string | null
    status: TaskStatus
    created_at: Date
    updated_at: Date
    userId: number
}