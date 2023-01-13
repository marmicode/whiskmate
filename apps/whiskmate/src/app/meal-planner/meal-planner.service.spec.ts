import { TestBed } from '@angular/core/testing';
import { createObserver } from '../../testing/observer';
import { MealPlanner } from './meal-planner.service';
import { recipeMother } from '../testing/recipe.mother';

describe(MealPlanner.name, () => {
  const { observe } = createObserver();
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

  it('should watch recipes', () => {
    const { mealPlanner } = createMealPlanner();

    const observer = observe(mealPlanner.recipes$);

    mealPlanner.addRecipe(burger);
    mealPlanner.addRecipe(salad);

    expect(observer.next).toBeCalledTimes(3);
    expect(observer.next).nthCalledWith(1, []);
    expect(observer.next).nthCalledWith(2, [
      expect.objectContaining({ name: 'Burger' }),
    ]);
    expect(observer.next).nthCalledWith(3, [
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });

  it('should watch if recipe can be added', () => {
    const { mealPlanner } = createMealPlanner();

    const observer = observe(mealPlanner.watchCanAddRecipe(burger));

    mealPlanner.addRecipe(burger);

    expect(observer.next).toBeCalledTimes(2);
    expect(observer.next).toBeCalledWith(true);
    expect(observer.next).toBeCalledWith(false);
  });

  it(`should not trigger observable if result didn't change`, () => {
    const { mealPlanner } = createMealPlanner();

    const observer = observe(mealPlanner.watchCanAddRecipe(burger));

    mealPlanner.addRecipe(burger);
    mealPlanner.addRecipe(salad);

    expect(observer.next).toBeCalledTimes(2);
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
