import { Injectable } from '@nestjs/common';
import { Task, Column, CreateTaskDto, UpdateTaskDto, User } from '@collab-task/shared-models';
import { BoardWebSocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor(private readonly webSocketGateway: BoardWebSocketGateway) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const mockUser: User = {
      id: 'demo-user-1',
      email: 'john.doe@example.com',
      displayName: 'John Doe',
      photoURL: 'https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff',
      createdAt: new Date(),
      lastLoginAt: new Date()
    };

    this.tasks = [
      {
        id: '1',
        title: 'Welcome to Collab Task!',
        description: 'This is your first task. Drag it between columns to see real-time updates.',
        column: Column.TODO,
        priority: 'medium',
        tags: ['welcome', 'demo'],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: mockUser,
        assignedTo: mockUser,
        comments: [],
        order: 0
      },
      {
        id: '2',
        title: 'Add more features',
        description: 'Implement additional features like user authentication, file uploads, and more.',
        column: Column.IN_PROGRESS,
        priority: 'high',
        tags: ['feature', 'development'],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: mockUser,
        assignedTo: mockUser,
        comments: [],
        order: 0
      },
      {
        id: '3',
        title: 'Write documentation',
        description: 'Create comprehensive documentation for the project.',
        column: Column.DONE,
        priority: 'low',
        tags: ['documentation'],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: mockUser,
        assignedTo: mockUser,
        comments: [],
        order: 0
      }
    ];
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  create(createTaskDto: CreateTaskDto): Task {
    const mockUser: User = {
      id: 'demo-user-1',
      email: 'john.doe@example.com',
      displayName: 'John Doe',
      photoURL: 'https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff',
      createdAt: new Date(),
      lastLoginAt: new Date()
    };

    const newTask: Task = {
      id: (this.nextId++).toString(),
      title: createTaskDto.title,
      description: createTaskDto.description || '',
      column: createTaskDto.column || Column.TODO,
      priority: createTaskDto.priority || 'medium',
      tags: createTaskDto.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: mockUser,
      assignedTo: createTaskDto.assignedTo ? mockUser : undefined,
      comments: [],
      order: this.tasks.filter(t => t.column === createTaskDto.column).length
    };

    this.tasks.push(newTask);
    
    // Emit WebSocket event
    this.webSocketGateway.server.emit('taskCreated', newTask);
    
    return newTask;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updateTaskDto,
      updatedAt: new Date()
    } as Task;

    this.tasks[taskIndex] = updatedTask;
    
    // Emit WebSocket event
    this.webSocketGateway.server.emit('taskUpdated', updatedTask);
    
    return updatedTask;
  }

  moveTask(id: string, newColumn: Column): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const updatedTask = {
      ...this.tasks[taskIndex],
      column: newColumn,
      updatedAt: new Date()
    } as Task;

    this.tasks[taskIndex] = updatedTask;
    
    // Emit WebSocket event
    this.webSocketGateway.server.emit('taskMoved', {
      taskId: id,
      task: updatedTask
    });
    
    return updatedTask;
  }

  remove(id: string): void {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.tasks.splice(taskIndex, 1);
    
    // Emit WebSocket event
    this.webSocketGateway.server.emit('taskDeleted', { taskId: id });
  }
} 