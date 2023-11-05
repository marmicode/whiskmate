import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Output,
} from '@angular/core';
import { RecipeSearchComponent } from './recipe-search.component';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import { MealPlanner } from '../meal-planner/meal-planner.service';
import { Recipe } from './recipe';
import { Observable } from 'rxjs';

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
  @Input() set mealPlannerRecipes(meals: Recipe[]) {
    for (const meal of meals) {
      this._mealPlanner.addRecipe(meal);
    }
  }

  @Output() mealPlannerRecipesChange: Observable<Recipe[]>;

  private _mealPlanner = inject(MealPlanner);
  private _recipeRepositoryFake = inject(RecipeRepositoryFake);

  constructor() {
    this.mealPlannerRecipesChange = this._mealPlanner.recipes$;
    this._recipeRepositoryFake.setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);
  }
}
