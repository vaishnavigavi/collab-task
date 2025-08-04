import { Column } from './column.enum';
import { Comment } from './comment.interface';
import { User } from './user.interface';

export interface Task {
  id: string;
  title: string;
  description: string;
  column: Column;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  assignedTo?: User;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  comments: Comment[];
  order: number;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  column: Column;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  column?: Column;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

export interface MoveTaskDto {
  column: Column;
  order?: number;
} 