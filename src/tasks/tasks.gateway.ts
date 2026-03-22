import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { TaskType } from "./types/express";

@WebSocketGateway({
    cors: { origin: "*" }
})
export class TasksGateway {
    @WebSocketServer()
    server: Server

    sendTaskStatusUpdate(taskId: number, status: string) {
        this.server.emit('taskStatusUpdated', {
            id: taskId,
            status: status,
            timestamp: new Date()
        })
    }

    sendTaskCreated(task: TaskType) {
        this.server.emit('taskCreated', task)
    }

    sendTaskDeleted(taskId: number) {
        this.server.emit('taskDeleted', { id: taskId })
    }
}