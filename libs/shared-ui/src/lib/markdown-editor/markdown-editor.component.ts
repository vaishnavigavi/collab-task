import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent {
  @Input() content = '';
  @Input() placeholder = 'Write your description here...';
  @Output() contentChange = new EventEmitter<string>();

  onContentChange(value: string): void {
    this.contentChange.emit(value);
  }
} 