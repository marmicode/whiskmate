import { Recipe } from './recipe';
import { CardModule } from './../shared/card.component';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-preview',
  template: `<wm-card *ngIf="recipe" [pictureUri]="recipe.pictureUri">
    <h2 data-role="recipe-name">{{ recipe.name }}</h2>
    <ng-content></ng-content>
  </wm-card>`,
  styles: [
    `
      h2 {
        font-size: 1.2em;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
})
export class RecipePreviewComponent {
  @Input() recipe?: Recipe;
}

@NgModule({
  declarations: [RecipePreviewComponent],
  exports: [RecipePreviewComponent],
  imports: [CommonModule, CardModule],
})
export class RecipePreviewModule {}
