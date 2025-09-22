import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Catalog } from '../shared/catalog.ng';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [Catalog, RecipePreview],
  template: `
    <wm-catalog>
      @for (recipe of recipes(); track recipe.id) {
        <wm-recipe-preview [recipe]="recipe" />
      }
    </wm-catalog>
  `,
})
export class RecipeSearch {
  recipes = toSignal(inject(RecipeRepository).search());
}
