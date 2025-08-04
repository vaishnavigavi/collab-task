import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@collab-task/shared-models';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent {
  @Input() user!: User;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showName = false;

  getInitials(): string {
    return this.user.displayName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getSizeClass(): string {
    switch (this.size) {
      case 'small':
        return 'avatar-small';
      case 'large':
        return 'avatar-large';
      default:
        return 'avatar-medium';
    }
  }

  getAvatarColor(): string {
    const colors = [
      '#4f46e5', '#7c3aed', '#dc2626', '#ea580c', 
      '#d97706', '#059669', '#0d9488', '#0891b2'
    ];
    const index = this.user.id.charCodeAt(0) % colors.length;
    return colors[index];
  }
} 