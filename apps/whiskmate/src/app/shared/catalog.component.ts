import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-catalog',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 30px;
        justify-content: center;
        padding: 30px 0;
      }
    `,
  ],
})
export class CatalogComponent {}

@NgModule({
  declarations: [CatalogComponent],
  exports: [CatalogComponent],
  imports: [CommonModule],
})
export class CatalogModule {}
