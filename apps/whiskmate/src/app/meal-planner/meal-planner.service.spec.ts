import { TestBed } from '@angular/core/testing';
import { Recipe } from './../recipe/recipe';
import { MealPlanner } from './meal-planner.service';

describe(MealPlanner.name, () => {
  const papperdelle = {
    id: 'papperdelle-with-rose-harissa',
  } as Recipe;
  const puyLentil = {
    id: 'puy-lentil-and-aubergine-stew',
  } as Recipe;

  it('should add recipe', () => {
    const { mealPlanner } = createMealPlanner();

    mealPlanner.addRecipe(papperdelle);
    mealPlanner.addRecipe(puyLentil);

    expect(mealPlanner.getRecipes()).toEqual([
      expect.objectContaining({ id: 'papperdelle-with-rose-harissa' }),
      expect.objectContaining({ id: 'puy-lentil-and-aubergine-stew' }),
    ]);
  });

  it('should not allow recipe duplicates', () => {
    const { mealPlanner } = createMealPlannerWithPapperdelle();
    expect(mealPlanner.canAddRecipe(papperdelle)).toBe(false);
  });

  it('should allow new recipes', () => {
    const { mealPlanner } = createMealPlannerWithPapperdelle();
    expect(mealPlanner.canAddRecipe(puyLentil)).toBe(true);
  });

  it('should throw error if recipe is already present', () => {
    const { mealPlanner } = createMealPlannerWithPapperdelle();
    expect(() => mealPlanner.addRecipe(papperdelle)).toThrowError(
      `Can't add recipe.`
    );
  });

  function createMealPlannerWithPapperdelle() {
    const { mealPlanner, ...rest } = createMealPlanner();
    mealPlanner.addRecipe(papperdelle);
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
