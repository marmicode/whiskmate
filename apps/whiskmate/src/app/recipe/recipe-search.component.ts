import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RecipeAddButtonComponent } from '../meal-planner/recipe-add-button.component';
import { CatalogComponent } from '../shared/catalog.component';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [
    CatalogComponent,
    RecipeAddButtonComponent,
    RecipeFilterComponent,
    RecipePreviewComponent,
  ],
  template: `
    <wm-recipe-filter (filterChange)="filter.set($event)"></wm-recipe-filter>
    @if (recipes.hasValue()) {
      <wm-catalog>
        @for (recipe of recipes.value(); track recipe.id) {
          <wm-recipe-preview [recipe]="recipe">
            <wm-recipe-add-button [recipe]="recipe" />
          </wm-recipe-preview>
        }
      </wm-catalog>
    }
  `,
})
export class RecipeSearchComponent {
  filter = signal<RecipeFilter>({});
  recipes = rxResource({
    params: this.filter,
    stream: ({ params }) => this._recipeRepository.search(params),
  });

  private _recipeRepository = inject(RecipeRepository);
}
