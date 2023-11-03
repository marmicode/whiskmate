import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { firstValueFrom } from 'rxjs';

import { MealPlanner } from '../meal-planner/meal-planner.service';
import { RecipeAddButtonComponent } from '../meal-planner/recipe-add-button.component';
import { provideLocalStorageFake } from '../shared/local-storage.fake';
import { recipeMother } from '../testing/recipe.mother';
import { RecipeFilter } from './recipe-filter';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearchComponent } from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('should search recipes using given filter', async () => {
    const { getRecipeNames, updateFilter } = await renderComponent();

    updateFilter({
      keywords: 'Burg',
      maxIngredientCount: 3,
    });

    expect(getRecipeNames()).toEqual(['Burger']);
  });

  it('should add recipe to meal planner', async () => {
    const { getFirstAddButton, getMealPlannerRecipeNames } =
      await renderComponent();

    await getFirstAddButton().click();

    expect(await getMealPlannerRecipeNames()).toEqual(['Burger']);
  });

  it("should disable add button if can't add", async () => {
    const { getFirstAddButton } =
      await renderComponentWithBurgerInMealPlanner();

    /* Can't add burger because there is already a burger with the same id. */
    expect(getFirstAddButton().isDisabled()).toBe(true);
  });

  async function renderComponentWithBurgerInMealPlanner() {
    const { mealPlanner, detectChanges, ...utils } = await renderComponent();

    mealPlanner.addRecipe(recipeMother.withBasicInfo('Burger').build());
    detectChanges();

    return { ...utils };
  }

  async function renderComponent() {
    const { debugElement, detectChanges } = await render(
      RecipeSearchComponent,
      {
        detectChangesOnRender: true,
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [provideLocalStorageFake(), provideRecipeRepositoryFake()],
        configureTestBed(testBed) {
          testBed.overrideComponent(RecipeSearchComponent, {
            set: {
              imports: [CommonModule, RecipeAddButtonComponent],
              schemas: [CUSTOM_ELEMENTS_SCHEMA],
            },
          });

          testBed
            .inject(RecipeRepositoryFake)
            .setRecipes([
              recipeMother.withBasicInfo('Burger').build(),
              recipeMother.withBasicInfo('Salad').build(),
            ]);
        },
      }
    );

    /* This is required to flush effects and update views accordingly. */
    detectChanges();

    const mealPlanner = TestBed.inject(MealPlanner);

    return {
      mealPlanner,
      detectChanges,
      getFirstAddButton() {
        const addButtonEl = screen.getAllByRole<HTMLButtonElement>('button', {
          name: 'ADD',
        })[0];
        return {
          click: () => userEvent.click(addButtonEl),
          isDisabled: () => addButtonEl.disabled,
        };
      },
      async getMealPlannerRecipeNames() {
        const recipes = await firstValueFrom(mealPlanner.recipes$);
        return recipes.map((recipe) => recipe.name);
      },
      getRecipeNames() {
        return debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe.name);
      },
      updateFilter(filter: RecipeFilter) {
        debugElement
          .query(By.css('wm-recipe-filter'))
          .triggerEventHandler('filterChange', filter);
        detectChanges();
      },
    };
  }
});
