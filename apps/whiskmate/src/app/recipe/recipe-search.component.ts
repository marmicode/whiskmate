import { NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CatalogComponent } from '../shared/catalog.component';
import { Recipe } from './recipe';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';
import { rxComputed } from '@jscutlery/rx-computed';
import { RecipeAddButtonComponent } from '../meal-planner/recipe-add-button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-search',
  imports: [
    CatalogComponent,
    NgForOf,
    RecipeAddButtonComponent,
    RecipeFilterComponent,
    RecipePreviewComponent,
  ],
  template: `
    <wm-recipe-filter (filterChange)="filter.set($event)"></wm-recipe-filter>
    <wm-catalog>
      <wm-recipe-preview
        *ngFor="let recipe of recipes(); trackBy: trackById"
        [recipe]="recipe"
      >
        <wm-recipe-add-button [recipe]="recipe"/>
      </wm-recipe-preview>
    </wm-catalog>
  `,
})
export class RecipeSearchComponent {
  filter = signal<RecipeFilter>({});
  recipes = rxComputed(() => this._recipeRepository.search(this.filter()));

  private _recipeRepository = inject(RecipeRepository);

  trackById(_: number, recipe: Recipe) {
    return recipe.id;
  }
}
