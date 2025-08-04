import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';

// CDK Modules
import { DragDropModule } from '@angular/cdk/drag-drop';

// Components
import { KanbanCardComponent } from './kanban-card/kanban-card.component';
import { KanbanColumnComponent } from './kanban-column/kanban-column.component';
import { LoadingSkeletonComponent } from './loading-skeleton/loading-skeleton.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { PriorityBadgeComponent } from './priority-badge/priority-badge.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule,
    MatBadgeModule,
    DragDropModule
  ],
  declarations: [
    KanbanCardComponent,
    KanbanColumnComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ThemeToggleComponent,
    UserAvatarComponent,
    PriorityBadgeComponent,
    CommentListComponent,
    MarkdownEditorComponent,
    TaskDialogComponent
  ],
  exports: [
    KanbanCardComponent,
    KanbanColumnComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ThemeToggleComponent,
    UserAvatarComponent,
    PriorityBadgeComponent,
    CommentListComponent,
    MarkdownEditorComponent,
    TaskDialogComponent
  ]
})
export class SharedUiModule {} 