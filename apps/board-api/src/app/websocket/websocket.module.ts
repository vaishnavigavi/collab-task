import { Module } from '@nestjs/common';
import { BoardWebSocketGateway } from './websocket.gateway';

@Module({
  providers: [BoardWebSocketGateway],
  exports: [BoardWebSocketGateway],
})
export class WebSocketModule {} 