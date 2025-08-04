import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';
import { Task, Column, CreateTaskDto, MoveTaskDto, CreateCommentDto } from '@collab-task/shared-models';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();
  private socket: Socket | null = null;
  private isInitialized = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    console.log('TaskService: Constructor called');
    // Load tasks immediately and synchronously
    this.loadTasksSync();
  }

  private loadTasksSync(): void {
    console.log('TaskService: Loading tasks synchronously...');
    console.log('TaskService: API URL:', `${environment.apiUrl}/tasks`);
    
    // Make the HTTP request and handle it immediately
    this.http.get<Task[]>(`${environment.apiUrl}/tasks`)
      .subscribe({
        next: (tasks) => {
          console.log('TaskService: Tasks loaded successfully:', tasks);
          console.log('TaskService: Tasks count:', tasks?.length || 0);
          this.tasksSubject.next(tasks || []);
          this.isInitialized = true;
          console.log('TaskService: isInitialized set to true, tasks count:', this.tasksSubject.value.length);
          
          // Initialize WebSocket after tasks are loaded
          this.initializeWebSocket();
        },
        error: (error) => {
          console.error('TaskService: Error loading tasks:', error);
          console.error('TaskService: Error details:', error.message, error.status);
          this.tasksSubject.next([]);
          this.isInitialized = true;
          console.log('TaskService: isInitialized set to true (error case)');
        }
      });
  }

  private initializeWebSocket(): void {
    console.log('TaskService: Initializing WebSocket connection...');
    this.socket = io(environment.apiUrl + '/ws/board');
    
    this.socket.on('connect', () => {
      console.log('TaskService: WebSocket connected successfully');
    });

    this.socket.on('disconnect', () => {
      console.log('TaskService: WebSocket disconnected');
    });

    this.socket.on('taskCreated', (task: Task) => {
      console.log('TaskService: WebSocket taskCreated received:', task);
      const currentTasks = this.tasksSubject.value;
      if (!currentTasks.find(t => t.id === task.id)) {
        const updatedTasks = [...currentTasks, task];
        console.log('TaskService: Adding new task, total tasks:', updatedTasks.length);
        this.tasksSubject.next(updatedTasks);
      }
    });

    this.socket.on('taskMoved', (data: { taskId: string; task: Task }) => {
      console.log('TaskService: WebSocket taskMoved received:', data);
      const currentTasks = this.tasksSubject.value;
      const updatedTasks = currentTasks.map(task => 
        task.id === data.taskId ? data.task : task
      );
      this.tasksSubject.next(updatedTasks);
    });

    this.socket.on('taskUpdated', (task: Task) => {
      console.log('TaskService: WebSocket taskUpdated received:', task);
      const currentTasks = this.tasksSubject.value;
      const updatedTasks = currentTasks.map(t => 
        t.id === task.id ? task : t
      );
      this.tasksSubject.next(updatedTasks);
    });

    this.socket.on('taskDeleted', (data: { taskId: string }) => {
      console.log('TaskService: WebSocket taskDeleted received:', data);
      const currentTasks = this.tasksSubject.value;
      const updatedTasks = currentTasks.filter(task => task.id !== data.taskId);
      this.tasksSubject.next(updatedTasks);
    });

    this.socket.on('commentAdded', (data: { taskId: string; comment: any }) => {
      console.log('TaskService: WebSocket commentAdded received:', data);
      const currentTasks = this.tasksSubject.value;
      const updatedTasks = currentTasks.map(task => {
        if (task.id === data.taskId) {
          return {
            ...task,
            comments: [...task.comments, data.comment]
          };
        }
        return task;
      });
      this.tasksSubject.next(updatedTasks);
    });
  }

  getCurrentTasks(): Task[] {
    const tasks = this.tasksSubject.value;
    console.log('TaskService: getCurrentTasks called, returning', tasks.length, 'tasks');
    return tasks;
  }

  getTasksByColumn(column: Column): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.column === column))
    );
  }

  createTask(taskData: CreateTaskDto): Observable<Task> {
    console.log('TaskService: Creating task:', taskData);
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, taskData).pipe(
      tap({
        next: (response) => {
          console.log('TaskService: Task created successfully via API:', response);
          const currentTasks = this.tasksSubject.value;
          const updatedTasks = [...currentTasks, response];
          this.tasksSubject.next(updatedTasks);
        },
        error: (error) => console.error('TaskService: Error creating task:', error)
      })
    );
  }

  moveTask(taskId: string, moveData: MoveTaskDto): Observable<Task> {
    return this.http.patch<Task>(`${environment.apiUrl}/tasks/${taskId}/column`, moveData).pipe(
      tap({
        next: (response) => {
          console.log('TaskService: Task moved successfully:', response);
          const currentTasks = this.tasksSubject.value;
          const updatedTasks = currentTasks.map(task => 
            task.id === taskId ? response : task
          );
          this.tasksSubject.next(updatedTasks);
        },
        error: (error) => console.error('TaskService: Error moving task:', error)
      })
    );
  }

  updateTask(taskId: string, updates: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${environment.apiUrl}/tasks/${taskId}`, updates).pipe(
      tap({
        next: (response) => {
          console.log('TaskService: Task updated successfully:', response);
          const currentTasks = this.tasksSubject.value;
          const updatedTasks = currentTasks.map(task => 
            task.id === taskId ? response : task
          );
          this.tasksSubject.next(updatedTasks);
        },
        error: (error) => console.error('TaskService: Error updating task:', error)
      })
    );
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/tasks/${taskId}`).pipe(
      tap({
        next: () => {
          console.log('TaskService: Task deleted successfully');
          const currentTasks = this.tasksSubject.value;
          const updatedTasks = currentTasks.filter(task => task.id !== taskId);
          this.tasksSubject.next(updatedTasks);
        },
        error: (error) => console.error('TaskService: Error deleting task:', error)
      })
    );
  }

  addComment(taskId: string, commentData: CreateCommentDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/tasks/${taskId}/comments`, commentData);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isReady(): boolean {
    const ready = this.isInitialized;
    console.log('TaskService: isReady() called, returning:', ready);
    return ready;
  }
} 