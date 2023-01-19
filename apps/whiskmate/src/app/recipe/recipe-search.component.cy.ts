import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeRepositoryFake } from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import { MealPlanner } from '../meal-planner/meal-planner.service';
import { firstValueFrom } from 'rxjs';
import { MealRepositoryFake } from '../meal-planner/meal-repository.fake';
import { MealRepository } from '../meal-planner/meal-repository.service';

describe(RecipeSearchComponent.name, () => {
  it('should show recipes', () => {
    const { findRecipeNames } = renderComponent();

    findRecipeNames().should('have.length', 2);
    findRecipeNames().eq(0).should('have.text', 'Burger');
    findRecipeNames().eq(1).should('have.text', 'Salad');
  });

  it('should filter recipes', () => {
    const { findRecipeNames, setFilter } = renderComponent();

    setFilter({ keywords: 'Bur' });

    findRecipeNames().should('have.length', 1);
    findRecipeNames().eq(0).should('have.text', 'Burger');
  });

  it('should add recipe to meal plan', () => {
    const { clickFirstAddButton, getMealPlannerRecipeNames } =
      renderComponent();

    clickFirstAddButton();

    getMealPlannerRecipeNames().should('eql', ['Burger']);
  });

  it('should disable add button if recipe is already in meal plan', () => {
    const { mealRepoFake, findFirstAddButton, render } = setUpComponent();

    cy.then(() =>
      mealRepoFake.addMeal(recipeMother.withBasicInfo('Burger').build())
    );

    render();

    findFirstAddButton().should('be.disabled');
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

    function findFirstAddButton() {
      return cy.findAllByRole('button', { name: 'ADD' }).first();
    }

    return {
      mealRepoFake,
      clickFirstAddButton() {
        return findFirstAddButton().click();
      },
      findFirstAddButton,
      findRecipeNames() {
        return cy.findAllByTestId('recipe-name');
      },
      setFilter({ keywords }: { keywords: string }) {
        return cy.findByLabelText('Keywords').type(keywords);
      },
      getMealPlannerRecipeNames() {
        return cy.inject(MealPlanner).then(async (mealPlanner) => {
          const recipes = await firstValueFrom(mealPlanner.recipes$);
          return recipes.map((recipe) => recipe.name);
        });
      },
      render() {
        cy.mount(RecipeSearchComponent, {
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
