import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Task, Column, COLUMN_LABELS, COLUMN_ORDER, CreateTaskDto, UpdateTaskDto } from '@collab-task/shared-models';
import { TaskService } from '../services/task.service';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service';
import { SharedUiModule } from '@collab-task/shared-ui';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule, 
    SharedUiModule, 
    MatIconModule, 
    MatButtonModule, 
    MatSnackBarModule, 
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  tasks$: any;
  isDarkMode$: any;
  currentUser$: any;
  
  columns = COLUMN_ORDER;
  columnLabels = COLUMN_LABELS;
  
  private destroy$ = new Subject<void>();

  constructor(
    public taskService: TaskService,
    private themeService: ThemeService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log('BoardComponent: ngOnInit called');
    console.log('BoardComponent: taskService.isReady():', this.taskService.isReady());
    console.log('BoardComponent: taskService.getCurrentTasks().length:', this.taskService.getCurrentTasks().length);
    
    // Initialize observables
    this.tasks$ = this.taskService.tasks$;
    this.isDarkMode$ = this.themeService.isDarkMode$;
    this.currentUser$ = this.authService.user$;
    
    // Subscribe to tasks to trigger change detection
    this.taskService.tasks$.subscribe(tasks => {
      console.log('BoardComponent: tasks$ subscription triggered, tasks count:', tasks.length);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.taskService.disconnect();
  }

  getTasksForColumn(column: Column): Task[] {
    // Get the current value from the BehaviorSubject
    const tasks = this.taskService.getCurrentTasks();
    console.log(`Getting tasks for column ${column}, total tasks:`, tasks.length);
    const filteredTasks = tasks.filter((task: Task) => task.column === column);
    console.log(`Filtered tasks for ${column}:`, filteredTasks.length);
    return filteredTasks;
  }

  onTaskDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }

    const task = event.item.data as Task;
    const newColumn = event.container.id as Column;

    this.taskService.moveTask(task.id, { column: newColumn })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackBar.open(`Task moved to ${this.columnLabels[newColumn]}`, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        error: (error) => {
          console.error('Error moving task:', error);
          this.snackBar.open('Error moving task', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
  }

  onAddTask(column: Column): void {
    console.log('Adding task to column:', column);
    const newTask: CreateTaskDto = {
      title: `New Task ${Date.now()}`,
      description: 'Click to edit this task',
      column: column,
      priority: 'medium',
      tags: ['new']
    };

    this.taskService.createTask(newTask)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task) => {
          console.log('Task created successfully:', task);
          this.snackBar.open(`Task created in ${this.columnLabels[column]}`, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.snackBar.open('Error creating task', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
  }

  onCardClick(task: Task): void {
    console.log('Card clicked:', task);
    this.openTaskDialog(task);
  }

  onDeleteTask(event: Event, task: Task): void {
    event.stopPropagation(); // Prevent card click
    
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.taskService.deleteTask(task.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.snackBar.open('Task deleted successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          },
          error: (error) => {
            console.error('Error deleting task:', error);
            this.snackBar.open('Error deleting task', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        });
    }
  }

  openTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task, columns: this.columns, columnLabels: this.columnLabels }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'update') {
          this.taskService.updateTask(task.id, result.data)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                this.snackBar.open('Task updated successfully', 'Close', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });
              },
              error: (error) => {
                console.error('Error updating task:', error);
                this.snackBar.open('Error updating task', 'Close', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });
              }
            });
        } else if (result.action === 'delete') {
          this.taskService.deleteTask(task.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                this.snackBar.open('Task deleted successfully', 'Close', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });
              },
              error: (error) => {
                console.error('Error deleting task:', error);
                this.snackBar.open('Error deleting task', 'Close', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });
              }
            });
        }
      }
    });
  }

  onThemeChange(theme: 'light' | 'dark'): void {
    if (theme === 'dark') {
      this.themeService.toggleTheme();
    } else {
      this.themeService.toggleTheme();
    }
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }

  trackByColumn(index: number, column: Column): string {
    return column;
  }

  forceLoadTasks(): void {
    console.log('Board: Force load triggered');
    // Direct API call to load tasks
    this.http.get<any[]>(`http://localhost:3333/tasks`).subscribe({
      next: (tasks) => {
        console.log('Board: Force load successful, tasks:', tasks.length);
        // Update the task service directly
        this.taskService['tasksSubject'].next(tasks);
      },
      error: (error) => {
        console.error('Board: Force load failed:', error);
      }
    });
  }

  loadTasks(): void {
    console.log('Board: Manual load triggered');
    this.http.get<any[]>(`http://localhost:3333/tasks`).subscribe({
      next: (tasks) => {
        console.log('Board: Manual load successful, tasks:', tasks.length);
        // Force update the task service
        this.taskService.tasks$.subscribe();
      },
      error: (error) => {
        console.error('Board: Manual load failed:', error);
      }
    });
  }
}

// Task Dialog Component
@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="task-dialog">
      <h2 mat-dialog-title class="dialog-title">
        <mat-icon>edit</mat-icon>
        {{ data.task ? 'Edit Task' : 'New Task' }}
      </h2>
      
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
        <mat-dialog-content class="dialog-content">
          <div class="form-row">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Title</mat-label>
              <input matInput formControlName="title" placeholder="Enter task title">
              <mat-error *ngIf="taskForm.get('title')?.hasError('required')">
                Title is required
              </mat-error>
              <mat-error *ngIf="taskForm.get('title')?.hasError('minlength')">
                Title must be at least 3 characters
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="4" placeholder="Enter task description"></textarea>
              <mat-error *ngIf="taskForm.get('description')?.hasError('required')">
                Description is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row two-columns">
            <mat-form-field appearance="fill" class="half-width">
              <mat-label>Priority</mat-label>
              <mat-select formControlName="priority">
                <mat-option value="low">
                  <mat-icon>arrow_downward</mat-icon>
                  Low
                </mat-option>
                <mat-option value="medium">
                  <mat-icon>remove</mat-icon>
                  Medium
                </mat-option>
                <mat-option value="high">
                  <mat-icon>arrow_upward</mat-icon>
                  High
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="fill" class="half-width">
              <mat-label>Column</mat-label>
              <mat-select formControlName="column">
                <mat-option *ngFor="let col of data.columns" [value]="col">
                  {{ data.columnLabels[col] }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end" class="dialog-actions">
          <button type="button" mat-button color="warn" (click)="onDelete()" *ngIf="data.task">
            <mat-icon>delete</mat-icon>
            Delete
          </button>
          <button type="button" mat-button (click)="onCancel()">
            <mat-icon>close</mat-icon>
            Cancel
          </button>
          <button type="submit" mat-raised-button color="primary" [disabled]="taskForm.invalid">
            <mat-icon>save</mat-icon>
            Save
          </button>
        </mat-dialog-actions>
      </form>
    </div>
  `,
  styles: [`
    .task-dialog {
      min-width: 500px;
      max-width: 600px;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .dialog-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      padding: 20px 24px 0;
      color: #333;
      font-weight: 500;
    }
    
    .dialog-content {
      padding: 20px 24px;
      max-height: 400px;
      overflow-y: auto;
    }
    
    .form-row {
      margin-bottom: 20px;
    }
    
    .two-columns {
      display: flex;
      gap: 16px;
    }
    
    .full-width {
      width: 100%;
    }
    
    .half-width {
      flex: 1;
    }
    
    .dialog-actions {
      padding: 16px 24px;
      margin: 0;
      border-top: 1px solid #e0e0e0;
      background: #fafafa;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    
    .dialog-actions button {
      margin-left: 0;
    }
    
    mat-form-field {
      width: 100%;
    }
    
    /* Fix for fill appearance form fields */
    .mat-mdc-form-field {
      margin-bottom: 8px;
    }
    
    .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }
    
    .mat-mdc-form-field-focus-overlay {
      background: transparent;
    }
    
    .mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
      opacity: 0;
    }
    
    .mat-mdc-text-field-wrapper {
      background: #f5f5f5;
      border-radius: 4px;
    }
    
    .mat-mdc-form-field.mat-focused .mat-mdc-text-field-wrapper {
      background: #f0f0f0;
    }
    
    .mat-mdc-form-field-infix {
      padding: 8px 0;
    }
    
    .mat-mdc-form-field-label {
      color: rgba(0, 0, 0, 0.6);
    }
    
    .mat-mdc-form-field.mat-focused .mat-mdc-form-field-label {
      color: #4F46E5;
    }
    
    /* Remove any unwanted lines and underlines */
    .mat-mdc-form-field-underline {
      display: none !important;
    }
    
    .mat-mdc-form-field-ripple {
      display: none !important;
    }
    
    .mat-mdc-form-field-outline {
      display: none !important;
    }
    
    .mat-mdc-form-field-outline-thick {
      display: none !important;
    }
    
    mat-select mat-option {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    textarea {
      resize: vertical;
      min-height: 80px;
    }
    
    input, textarea {
      caret-color: #4F46E5;
    }
    
    /* Ensure no weird lines appear */
    .mat-mdc-form-field.mat-focused .mat-mdc-form-field-underline {
      display: none !important;
    }
    
    .mat-mdc-form-field.mat-focused .mat-mdc-form-field-ripple {
      display: none !important;
    }
  `]
})
export class TaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task; columns: Column[]; columnLabels: Record<Column, string> },
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: [data.task?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [data.task?.description || '', [Validators.required]],
      priority: [data.task?.priority || 'medium', [Validators.required]],
      column: [data.task?.column || data.columns[0], [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close({
        action: 'update',
        data: this.taskForm.value
      });
    }
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.dialogRef.close({
        action: 'delete'
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 