import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from '@collab-task/shared-models';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanCardComponent {
  @Input() task!: Task;
  @Input() isDarkMode = false;
  @Input() isDragging = false;
  @Output() cardClick = new EventEmitter<Task>();
  @Output() cardDrop = new EventEmitter<CdkDragDrop<Task[]>>();

  onCardClick(): void {
    this.cardClick.emit(this.task);
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    this.cardDrop.emit(event);
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'high':
        return 'priority_high';
      case 'medium':
        return 'remove';
      case 'low':
        return 'low_priority';
      default:
        return 'fiber_manual_record';
    }
  }
} 