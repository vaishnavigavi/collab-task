import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { BoardWebSocketGateway } from '../websocket/websocket.gateway';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, BoardWebSocketGateway],
  exports: [CommentsService],
})
export class CommentsModule {} 