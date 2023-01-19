import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeRepositoryFake } from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import { MealPlanner } from '../meal-planner/meal-planner.service';
import { firstValueFrom } from 'rxjs';
import { MealRepositoryFake } from '../meal-planner/meal-repository.fake';
import { MealRepository } from '../meal-planner/meal-repository.service';
import { getHarness } from '@jscutlery/cypress-harness';
import { RecipeSearchHarness } from './recipe-search.harness';

describe(RecipeSearchComponent.name, () => {
  it('should show recipes', () => {
    const { harness } = renderComponent();

    harness.getRecipeNames().should('deep.equal', ['Burger', 'Salad']);
  });

  it('should filter recipes', () => {
    const { harness } = renderComponent();

    harness.getFilter().setValue({ keywords: 'Bur' });

    harness.getRecipeNames().should('deep.equal', ['Burger']);
  });

  it('should add recipe to meal plan', () => {
    const { harness, getMealPlannerRecipeNames } = renderComponent();

    harness.getFirstRecipeAddButton().invoke('click');

    getMealPlannerRecipeNames().should('eql', ['Burger']);
  });

  it('should disable add button if recipe is already in meal plan', () => {
    const { mealRepoFake, harness, render } = setUpComponent();

    cy.then(() =>
      mealRepoFake.addMeal(recipeMother.withBasicInfo('Burger').build())
    );

    render();

    harness.getFirstRecipeAddButton().isDisabled().should('be.true');
  });

  function renderComponent() {
    const { render, ...utils } = setUpComponent();

    render();

    return { ...utils };
  }

  function setUpComponent() {
    const recipeRepoFake = new RecipeRepositoryFake();
    const mealRepoFake = new MealRepositoryFake();

    recipeRepoFake.setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    return {
      harness: getHarness(RecipeSearchHarness),
      mealRepoFake,
      getMealPlannerRecipeNames() {
        return cy.inject(MealPlanner).then(async (mealPlanner) => {
          const recipes = await firstValueFrom(mealPlanner.recipes$);
          return recipes.map((recipe) => recipe.name);
        });
      },
      render() {
        cy.mount('<wm-recipe-search></wm-recipe-search>', {
          imports: [RecipeSearchComponent],
          providers: [
            {
              provide: RecipeRepository,
              useValue: recipeRepoFake,
            },
            {
              provide: MealRepository,
              useValue: mealRepoFake,
            },
          ],
        });
      },
    };
  }
});
