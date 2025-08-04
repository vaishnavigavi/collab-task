import { Injectable } from '@nestjs/common';
import { Comment, CreateCommentDto, User } from '@collab-task/shared-models';
import { BoardWebSocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class CommentsService {
  constructor(private readonly webSocketGateway: BoardWebSocketGateway) {}

  addComment(taskId: string, createCommentDto: CreateCommentDto): Comment {
    const mockUser: User = {
      id: 'demo-user-1',
      email: 'demo@example.com',
      displayName: 'Demo User',
      photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=4f46e5&color=fff',
      createdAt: new Date(),
      lastLoginAt: new Date()
    };

    const newComment: Comment = {
      id: Date.now().toString(),
      taskId,
      text: createCommentDto.text,
      createdAt: new Date(),
      createdBy: mockUser
    };

    // Emit WebSocket event
    this.webSocketGateway.server.emit('commentAdded', {
      taskId,
      comment: newComment
    });

    return newComment;
  }
} 