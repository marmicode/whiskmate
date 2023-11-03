import { TestBed } from '@angular/core/testing';
import { createObserver } from '../../testing/observer';
import { MealPlanner } from './meal-planner.service';
import { recipeMother } from '../testing/recipe.mother';

describe(MealPlanner.name, () => {
  const { observe } = createObserver();

  it('should add recipe', () => {
    const { mealPlanner, burger, salad } = createMealPlanner();

    mealPlanner.addRecipe(burger);
    mealPlanner.addRecipe(salad);

    expect(mealPlanner.getRecipes()).toEqual([
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });

  it('should not allow recipe duplicates', () => {
    const { mealPlanner, burgerDuplicate } = createMealPlannerWithBurger();

    expect(mealPlanner.canAddRecipe(burgerDuplicate)).toBe(false);
  });

  it('should allow new recipes', () => {
    const { mealPlanner, salad } = createMealPlannerWithBurger();

    expect(mealPlanner.canAddRecipe(salad)).toBe(true);
  });

  it('should throw error if recipe is already present', () => {
    const { mealPlanner, burgerDuplicate } = createMealPlannerWithBurger();

    expect(() => mealPlanner.addRecipe(burgerDuplicate)).toThrow(
      `Can't add recipe.`
    );
  });

  describe('recipes$', () => {
    it('should emit empty array when no recipes', async () => {
      const { mealPlanner } = createMealPlanner();

      const observer = observe(mealPlanner.recipes$);

      expect(observer.next).toHaveBeenCalledTimes(1);
      expect(observer.next).toHaveBeenCalledWith([]);
    });

    it('should emit recipes when added', () => {
      const { mealPlanner, burger, salad } = createMealPlanner();

      const observer = observe(mealPlanner.recipes$);

      observer.mockClear();

      mealPlanner.addRecipe(burger);
      mealPlanner.addRecipe(salad);

      expect(observer.next).toHaveBeenCalledTimes(2);
      expect(observer.next).toHaveBeenNthCalledWith(1, [
        expect.objectContaining({ name: 'Burger' }),
      ]);
      expect(observer.next).toHaveBeenNthCalledWith(2, [
        expect.objectContaining({ name: 'Burger' }),
        expect.objectContaining({ name: 'Salad' }),
      ]);
    });
  });

  describe('watchCanAddRecipe()', () => {
    it('should instantly emit if recipe can be added', () => {
      const { mealPlanner, burger } = createMealPlanner();

      const observer = observe(mealPlanner.watchCanAddRecipe(burger));

      expect(observer.next).toHaveBeenCalledTimes(1);
      expect(observer.next).toHaveBeenCalledWith(true);
    });

    it(`should emit false when recipe is added and can't be added anymore`, () => {
      const { mealPlanner, burger } = createMealPlanner();

      const observer = observe(mealPlanner.watchCanAddRecipe(burger));

      observer.mockClear();

      mealPlanner.addRecipe(burger);

      expect(observer.next).toHaveBeenCalledTimes(1);
      expect(observer.next).toHaveBeenCalledWith(false);
    });

    it(`should not emit if result didn't change`, () => {
      const { mealPlanner, burger, salad } = createMealPlanner();

      const observer = observe(mealPlanner.watchCanAddRecipe(burger));

      mealPlanner.addRecipe(burger);

      observer.mockClear();

      mealPlanner.addRecipe(salad);

      expect(observer.next).not.toHaveBeenCalled();
    });
  });

  function createMealPlannerWithBurger() {
    const { mealPlanner, burger, ...utils } = createMealPlanner();

    mealPlanner.addRecipe(burger);

    return {
      mealPlanner,
      ...utils,
    };
  }

  function createMealPlanner() {
    return {
      burger: recipeMother.withBasicInfo('Burger').build(),
      burgerDuplicate: recipeMother.withBasicInfo('Burger').build(),
      salad: recipeMother.withBasicInfo('Salad').build(),
      mealPlanner: TestBed.inject(MealPlanner),
    };
  }
});
