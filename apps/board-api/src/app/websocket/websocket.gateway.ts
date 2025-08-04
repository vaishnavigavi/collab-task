import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: [
      process.env['FRONTEND_URL'] || 'http://localhost:4200',
      'http://localhost:4201',
      'http://localhost:4200',
      'https://collab-task.vercel.app',
      'https://collab-task-git-main.vercel.app',
      'https://collab-task-git-develop.vercel.app'
    ],
    credentials: true,
  },
  namespace: '/ws/board',
})
export class BoardWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinBoard')
  handleJoinBoard(client: Socket) {
    client.join('board');
    console.log(`Client ${client.id} joined board`);
  }

  @SubscribeMessage('leaveBoard')
  handleLeaveBoard(client: Socket) {
    client.leave('board');
    console.log(`Client ${client.id} left board`);
  }

  // Emit task events to all connected clients
  emitTaskCreated(task: any) {
    this.server.to('board').emit('taskCreated', task);
  }

  emitTaskMoved(data: { taskId: string; task: any }) {
    this.server.to('board').emit('taskMoved', data);
  }

  emitTaskUpdated(task: any) {
    this.server.to('board').emit('taskUpdated', task);
  }

  emitTaskDeleted(data: { taskId: string }) {
    this.server.to('board').emit('taskDeleted', data);
  }

  emitCommentAdded(data: { taskId: string; comment: any }) {
    this.server.to('board').emit('commentAdded', data);
  }
} 