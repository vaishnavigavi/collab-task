import { Task } from './task.interface';
import { Comment } from './comment.interface';

export interface WebSocketEvent {
  type: string;
  payload: any;
  timestamp: Date;
}

export interface TaskCreatedEvent extends WebSocketEvent {
  type: 'taskCreated';
  payload: Task;
}

export interface TaskMovedEvent extends WebSocketEvent {
  type: 'taskMoved';
  payload: {
    taskId: string;
    fromColumn: string;
    toColumn: string;
    task: Task;
  };
}

export interface CommentAddedEvent extends WebSocketEvent {
  type: 'commentAdded';
  payload: {
    taskId: string;
    comment: Comment;
  };
}

export interface UserJoinedEvent extends WebSocketEvent {
  type: 'userJoined';
  payload: {
    userId: string;
    displayName: string;
  };
}

export interface UserLeftEvent extends WebSocketEvent {
  type: 'userLeft';
  payload: {
    userId: string;
    displayName: string;
  };
}

export type BoardWebSocketEvent = 
  | TaskCreatedEvent 
  | TaskMovedEvent 
  | CommentAddedEvent 
  | UserJoinedEvent 
  | UserLeftEvent; 