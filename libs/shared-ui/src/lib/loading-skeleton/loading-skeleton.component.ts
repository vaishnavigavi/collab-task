import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  templateUrl: './loading-skeleton.component.html',
  styleUrls: ['./loading-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSkeletonComponent {
  @Input() count = 3;
  @Input() height = '120px';
  @Input() width = '100%';

  get skeletonItems(): number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }
} 