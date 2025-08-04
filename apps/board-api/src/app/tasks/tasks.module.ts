import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { BoardWebSocketGateway } from '../websocket/websocket.gateway';

@Module({
  controllers: [TasksController],
  providers: [TasksService, BoardWebSocketGateway],
  exports: [TasksService],
})
export class TasksModule {} 