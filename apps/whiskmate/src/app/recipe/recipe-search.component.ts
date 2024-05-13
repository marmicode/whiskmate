import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { CatalogComponent } from '../shared/catalog.component';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeAddButtonComponent } from '../meal-planner/recipe-add-button.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-search',
  imports: [
    CatalogComponent,
    RecipeAddButtonComponent,
    RecipeFilterComponent,
    RecipePreviewComponent,
  ],
  template: `
    <wm-recipe-filter (filterChange)="filter.set($event)"></wm-recipe-filter>
    <wm-catalog>
      @for (recipe of recipes(); track recipe.id) {
        <wm-recipe-preview [recipe]="recipe">
          <wm-recipe-add-button [recipe]="recipe"/>
        </wm-recipe-preview>
      }
    </wm-catalog>
  `,
})
export class RecipeSearchComponent {
  filter = signal<RecipeFilter>({});
  recipes = rxComputed(() => this._recipeRepository.search(this.filter()));

  private _recipeRepository = inject(RecipeRepository);
}
