import { RecipePreviewComponent } from './recipe-preview.component';
import { CatalogComponent } from '../shared/catalog.component';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-search',
  imports: [AsyncPipe, CatalogComponent, RecipePreviewComponent],
  template: `
    <wm-catalog>
      @for (recipe of recipes$ | async; track recipe.id) {
        <wm-recipe-preview [recipe]="recipe"/>
      }
    </wm-catalog>
  `,
})
export class RecipeSearchComponent {
  recipes$: Observable<Recipe[]>;

  private _recipeRepository = inject(RecipeRepository);

  constructor() {
    this.recipes$ = this._recipeRepository.search();
  }

  trackById(_: number, recipe: Recipe) {
    return recipe.id;
  }
}
