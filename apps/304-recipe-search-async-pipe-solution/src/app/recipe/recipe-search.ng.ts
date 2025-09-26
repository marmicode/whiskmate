import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalog } from '../shared/catalog.ng';
import { Recipe } from './recipe';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [AsyncPipe, Catalog, RecipePreview],
  template: `
    <wm-catalog>
      @for (recipe of recipes$ | async; track recipe.id) {
        <wm-recipe-preview [recipe]="recipe" />
      }
    </wm-catalog>
  `,
})
export class RecipeSearch {
  recipes$: Observable<Recipe[]>;

  private _recipeRepository = inject(RecipeRepository);

  constructor() {
    this.recipes$ = this._recipeRepository.search();
  }
}
