import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogComponent } from './../shared/catalog.component';
import { RecipePreviewComponent } from './recipe-preview.component';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-search',
  imports: [AsyncPipe, CatalogComponent, NgForOf, RecipePreviewComponent],
  template: `
    <wm-catalog>
      <wm-recipe-preview
        *ngFor="let recipe of recipes$ | async; trackBy: trackById"
        [recipe]="recipe"
      ></wm-recipe-preview>
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
