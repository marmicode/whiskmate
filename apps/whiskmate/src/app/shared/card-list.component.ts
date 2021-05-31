import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-card-list',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 30px;
        justify-content: center;
      }
    `,
  ],
})
export class CardListComponent {}

@NgModule({
  declarations: [CardListComponent],
  exports: [CardListComponent],
  imports: [CommonModule],
})
export class CardListModule {}
