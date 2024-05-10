import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { RecipeSearchComponent } from './recipe-search.component';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import { MealPlanner } from '../meal-planner/meal-planner.service';
import { Recipe } from './recipe';
import { defer } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search-test-container',
  providers: [provideRecipeRepositoryFake()],
  imports: [RecipeSearchComponent],
  template: `
    <wm-recipe-search/>`,
})
export class RecipeSearchTestContainerComponent {
  mealPlannerRecipes = input<Recipe[]>([]);
  mealPlannerRecipesChange = outputFromObservable(
    defer(() => this._mealPlanner.recipes$)
  );

  private _mealPlanner = inject(MealPlanner);
  private _recipeRepositoryFake = inject(RecipeRepositoryFake);
  private _syncMealPlanner = effect(() => {
    for (const recipe of this.mealPlannerRecipes()) {
      this._mealPlanner.addRecipe(recipe);
    }
  });

  constructor() {
    this._recipeRepositoryFake.setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);
  }
}
