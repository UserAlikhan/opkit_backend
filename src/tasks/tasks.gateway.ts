import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

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
}