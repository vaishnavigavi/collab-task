import { User } from './user.interface';

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  createdBy: User;
  taskId: string;
}

export interface CreateCommentDto {
  text: string;
  taskId: string;
} 