import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, Column } from '@collab-task/shared-models';

@Component({
  selector: 'app-kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss']
})
export class KanbanColumnComponent {
  @Input() column!: Column;
  @Input() tasks: Task[] = [];
  @Input() columnLabel = '';
  @Input() title = '';
  @Input() isLoading = false;
  @Output() addTask = new EventEmitter<Column>();
  @Output() cardClick = new EventEmitter<Task>();

  onAddTask(): void {
    this.addTask.emit(this.column);
  }

  onCardClick(task: Task): void {
    this.cardClick.emit(task);
  }

  onDrop(event: any): void {
    // Handle drop event if needed
    console.log('Drop event:', event);
  }

  getColumnIcon(column: Column): string {
    switch (column) {
      case Column.TODO:
        return 'assignment';
      case Column.IN_PROGRESS:
        return 'play_circle';
      case Column.DONE:
        return 'check_circle';
      default:
        return 'list';
    }
  }

  getColumnColor(column: Column): string {
    switch (column) {
      case Column.TODO:
        return 'border-blue-200 bg-blue-50';
      case Column.IN_PROGRESS:
        return 'border-orange-200 bg-orange-50';
      case Column.DONE:
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
} 