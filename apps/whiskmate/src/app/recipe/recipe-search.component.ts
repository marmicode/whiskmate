import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { BehaviorSubject, defer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MealPlanner } from './../meal-planner/meal-planner.service';
import { CatalogModule } from './../shared/catalog.component';
import { Recipe } from './recipe';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterModule } from './recipe-filter.component';
import { RecipePreviewModule } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: ` <wm-recipe-filter
      (filterChange)="onFilterChange($event)"
    ></wm-recipe-filter>
    <wm-catalog>
      <wm-recipe-preview
        *ngFor="let item of items$ | async; trackBy: trackById"
        [recipe]="item.recipe"
      >
        <button
          [disabled]="(item.canAdd$ | async) === false"
          (click)="addRecipe(item.recipe)"
          class="add-recipe-button"
          data-role="add-recipe"
        >
          ADD
        </button>
      </wm-recipe-preview>
    </wm-catalog>`,
  styles: [
    `
      .add-recipe-button {
        display: block;
        margin: auto;
      }
    `,
  ],
})
export class RecipeSearchComponent {
  filter$ = new BehaviorSubject<RecipeFilter>({});
  items$ = defer(() =>
    this.filter$.pipe(
      switchMap((filter) => this._recipeRepository.search(filter)),
      map((recipes) =>
        recipes.map((recipe) => ({
          canAdd$: this._mealPlanner.watchCanAddRecipe(recipe),
          recipe,
        }))
      )
    )
  );

  constructor(
    private _mealPlanner: MealPlanner,
    private _recipeRepository: RecipeRepository
  ) {}

  addRecipe(recipe: Recipe) {
    this._mealPlanner.addRecipe(recipe);
  }

  onFilterChange(filter: RecipeFilter) {
    this.filter$.next(filter);
  }

  trackById(_: number, { recipe }: { recipe: Recipe }) {
    return recipe.id;
  }
}

@NgModule({
  declarations: [RecipeSearchComponent],
  exports: [RecipeSearchComponent],
  imports: [
    CatalogModule,
    CommonModule,
    RecipeFilterModule,
    RecipePreviewModule,
  ],
})
export class RecipeSearchModule {}
