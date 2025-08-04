import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from '@collab-task/shared-models';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
  @Input() isLoading = false;
  @Output() addComment = new EventEmitter<string>();

  newCommentText = '';

  onSubmitComment(): void {
    if (this.newCommentText.trim()) {
      this.addComment.emit(this.newCommentText.trim());
      this.newCommentText = '';
    }
  }

  trackByCommentId(index: number, comment: Comment): string {
    return comment.id;
  }
} 