import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { TaskType } from "./types/express";

@WebSocketGateway({
    cors: { origin: "*" }
})
export class TasksGateway {
    @WebSocketServer()
    server: Server

    sendTaskStatusUpdate(task: TaskType) {
        this.server.emit('taskStatusUpdated', {
            ...task,
            timestamp: new Date().toISOString()
        })
    }

    sendTaskCreated(task: TaskType) {
        this.server.emit('taskCreated', task)
    }

    sendTaskDeleted(taskId: number) {
        this.server.emit('taskDeleted', { id: taskId })
    }
}