import { inject } from '@angular/core';
import { RecipeSearchComponent } from './recipe-search.component';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import { MealPlanner } from '../meal-planner/meal-planner.service';
import {
  MealRepositoryFake,
  provideMealRepositoryFake,
} from '../meal-planner/meal-repository.fake';
import { provideAppInitializer } from '../shared/provide-app-initializer';

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
    const { findFirstAddButton, getMealPlannerRecipeNames } = renderComponent();

    findFirstAddButton().click();

    getMealPlannerRecipeNames().should('deep.equal', ['Burger']);
  });

  it('should disable add button if recipe is already in meal plan', () => {
    const { findFirstAddButton } = renderComponent(() => {
      inject(MealPlanner).addRecipe(
        recipeMother.withBasicInfo('Burger').build()
      );
    });

    findFirstAddButton().should('be.disabled');
  });

  function renderComponent(configure?: () => void) {
    cy.mount(RecipeSearchComponent, {
      providers: [
        provideMealRepositoryFake(),
        provideRecipeRepositoryFake(),
        provideAppInitializer(() => {
          inject(RecipeRepositoryFake).setRecipes([
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
          ]);
          configure?.();
        }),
      ],
    });

    return {
      findFirstAddButton() {
        return cy.findAllByRole('button', { name: 'ADD' }).first();
      },
      findRecipeNames() {
        return cy.findAllByRole('heading', { level: 2 });
      },
      getMealPlannerRecipeNames() {
        return cy
          .inject(MealRepositoryFake)
          .then((fake) => fake.getMealsSync().map((meal) => meal.name));
      },
      setFilter({ keywords }: { keywords: string }) {
        cy.findByLabelText('Keywords').type(keywords);
      },
    };
  }
});
