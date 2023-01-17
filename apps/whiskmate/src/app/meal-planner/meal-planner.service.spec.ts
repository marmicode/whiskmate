import { TestBed } from '@angular/core/testing';
import { MealPlanner } from './meal-planner.service';
import { recipeMother } from '../testing/recipe.mother';

describe(MealPlanner.name, () => {
  const burger = recipeMother.withBasicInfo('Burger').build();
  const salad = recipeMother.withBasicInfo('Salad').build();

  it('should add recipe', () => {
    const { mealPlanner } = createMealPlanner();

    mealPlanner.addRecipe(burger);
    mealPlanner.addRecipe(salad);

    expect(mealPlanner.getRecipes()).toEqual([
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });

  it('should not allow recipe duplicates', () => {
    const { mealPlanner } = createMealPlannerWithBurger();

    expect(mealPlanner.canAddRecipe(burger)).toBe(false);
  });

  it('should allow new recipes', () => {
    const { mealPlanner } = createMealPlannerWithBurger();

    expect(mealPlanner.canAddRecipe(salad)).toBe(true);
  });

  it('should throw error if recipe is already present', () => {
    const { mealPlanner } = createMealPlannerWithBurger();

    expect(() => mealPlanner.addRecipe(burger)).toThrowError(
      `Can't add recipe.`
    );
  });

  function createMealPlannerWithBurger() {
    const { mealPlanner, ...rest } = createMealPlanner();

    mealPlanner.addRecipe(burger);

    return {
      mealPlanner,
      ...rest,
    };
  }

  function createMealPlanner() {
    return {
      mealPlanner: TestBed.inject(MealPlanner),
    };
  }
});
