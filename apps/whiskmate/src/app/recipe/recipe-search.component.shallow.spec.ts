import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { MealPlanner } from '../meal-planner/meal-planner.service';
import { recipeMother } from '../testing/recipe.mother';
import { RecipeFilter } from './recipe-filter';
import { RecipeRepositoryFake } from './recipe-repository.fake';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';
import { provideLocalStorageFake } from '../shared/local-storage.fake';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', () => {
    const { getRecipeNames } = renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('should search recipes using given filter', () => {
    const { getRecipeNames, updateFilter } = renderComponent();

    updateFilter({
      keywords: 'Burg',
      maxIngredientCount: 3,
    });

    expect(getRecipeNames()).toEqual(['Burger']);
  });

  it('should enable add button if recipe can be added', async () => {
    const { getFirstAddButton } = renderComponent();

    expect(getFirstAddButton().isDisabled()).toBe(false);
  });

  it('should add recipe to meal planner', async () => {
    const { getFirstAddButton, getMealPlannerRecipeNames } = renderComponent();

    getFirstAddButton().click();

    expect(await getMealPlannerRecipeNames()).toEqual(['Burger']);
  });

  it("should disable add button if can't add", async () => {
    const { getFirstAddButton } = renderComponentWithBurgerInMealPlanner();

    /* Can't add burger because there is already a burger with the same id. */
    expect(getFirstAddButton().isDisabled()).toBe(true);
  });

  function renderComponentWithBurgerInMealPlanner() {
    const { mealPlanner, detectChanges, ...utils } = renderComponent();

    mealPlanner.addRecipe(recipeMother.withBasicInfo('Burger').build());
    detectChanges();

    return { ...utils };
  }

  function renderComponent() {
    const fakeRepo = new RecipeRepositoryFake();

    fakeRepo.setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: RecipeRepository,
          useValue: fakeRepo,
        },
        provideLocalStorageFake(),
      ],
    });

    TestBed.overrideComponent(RecipeSearchComponent, {
      set: {
        imports: [CommonModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    const fixture = TestBed.createComponent(RecipeSearchComponent);
    fixture.detectChanges();

    const mealPlanner = TestBed.inject(MealPlanner);

    return {
      mealPlanner,
      detectChanges() {
        fixture.detectChanges();
      },
      getFirstAddButton() {
        const el = fixture.debugElement.query(By.css('[data-role=add-recipe]'));
        return {
          click: () => el.triggerEventHandler('click', {}),
          isDisabled: () => el.properties.disabled,
        };
      },
      async getMealPlannerRecipeNames() {
        const recipes = await firstValueFrom(mealPlanner.recipes$);
        return recipes.map((recipe) => recipe.name);
      },
      getRecipeNames() {
        return fixture.debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe.name);
      },
      updateFilter(filter: RecipeFilter) {
        fixture.debugElement
          .query(By.css('wm-recipe-filter'))
          .triggerEventHandler('filterChange', filter);
        fixture.detectChanges();
      },
    };
  }
});
