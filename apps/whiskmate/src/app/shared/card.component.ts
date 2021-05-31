import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-card',
  template: ` <img *ngIf="pictureUri" class="picture" [src]="pictureUri" />
    <div class="content">
      <ng-content></ng-content>
    </div>`,
  styles: [
    `
      :host {
        display: block;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        text-align: left;
        width: 300px;
      }
      .picture {
        object-fit: cover;
        height: 300px;
        width: 100%;
      }
      .content {
        margin: 10px;
      }
    `,
  ],
})
export class CardComponent {
  @Input() pictureUri?: string;
}

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent],
  imports: [CommonModule],
})
export class CardModule {}
