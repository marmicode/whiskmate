import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { defer } from 'rxjs';
import { MealPlanner } from '../meal-planner/meal-planner';
import { recipeMother } from '../testing/recipe.mother';
import { Recipe } from './recipe';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search-test-container',
  providers: [provideRecipeRepositoryFake()],
  imports: [RecipeSearch],
  template: ` <wm-recipe-search />`,
})
export class RecipeSearchTestContainer {
  mealPlannerRecipes = input<Recipe[]>([]);
  mealPlannerRecipesChange = outputFromObservable(
    defer(() => this._mealPlanner.recipes$),
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
