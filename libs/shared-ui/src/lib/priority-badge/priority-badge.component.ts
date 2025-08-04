import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-priority-badge',
  templateUrl: './priority-badge.component.html',
  styleUrls: ['./priority-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriorityBadgeComponent {
  @Input() priority: 'low' | 'medium' | 'high' = 'medium';

  getPriorityColor(): string {
    switch (this.priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  }

  getPriorityIcon(): string {
    switch (this.priority) {
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