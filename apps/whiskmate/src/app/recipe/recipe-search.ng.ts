import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { Catalog } from '../shared/catalog.ng';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
import { RecipeFilter } from './recipe-filter.ng';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [Catalog, RecipeFilter, RecipePreview],
  template: `
    <wm-recipe-filter (filterChange)="filter.set($event)"></wm-recipe-filter>
    <wm-catalog>
      @for (recipe of recipes(); track recipe.id) {
        <wm-recipe-preview [recipe]="recipe" />
      }
    </wm-catalog>
  `,
})
export class RecipeSearch {
  filter = signal<RecipeFilterCriteria>({});
  recipes = rxComputed(() => this._recipeRepository.search(this.filter()));

  private _recipeRepository = inject(RecipeRepository);
}
