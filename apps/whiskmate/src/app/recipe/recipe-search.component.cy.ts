import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeRepositoryFake } from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import { MealPlanner } from '../meal-planner/meal-planner.service';
import { firstValueFrom } from 'rxjs';
import { MealRepositoryFake } from '../meal-planner/meal-repository.fake';
import { MealRepository } from '../meal-planner/meal-repository.service';

describe(RecipeSearchComponent.name, () => {
  xit('🚧 should show recipes', () => {
    throw new Error('🚧 work in progress!');
  });

  xit('🚧 should filter recipes', () => {
    throw new Error('🚧 work in progress!');
  });

  xit('🚧 should add recipe to meal plan', () => {
    throw new Error('🚧 work in progress!');
  });

  xit('🚧 should disable add button if recipe is already in meal plan', () => {
    throw new Error('🚧 work in progress!');
  });

  function renderComponent() {
    cy.mount(RecipeSearchComponent, {
      providers: [],
    });

    return {
      findFirstAddButton() {
        throw new Error('🚧 work in progress!');
      },
      findRecipeNames() {
        throw new Error('🚧 work in progress!');
      },
      getMealPlannerRecipeNames() {
        throw new Error('🚧 work in progress!');
      },
      setFilter({ keywords }: { keywords: string }) {
        throw new Error('🚧 work in progress!');
      },
    };
  }
});
