import { TestBed } from '@angular/core/testing';
import { createObserver } from '../../testing/observer';
import { MealPlanner } from './meal-planner.service';
import { recipeMother } from '../testing/recipe.mother';
import { firstValueFrom } from 'rxjs';

describe(MealPlanner.name, () => {
  const { observe } = createObserver();
  const burger = recipeMother.withBasicInfo('Burger').build();
  const salad = recipeMother.withBasicInfo('Salad').build();

  it('should add recipe', async () => {
    const { mealPlanner } = createMealPlanner();

    mealPlanner.addRecipe(burger);
    mealPlanner.addRecipe(salad);

    expect(await firstValueFrom(mealPlanner.recipes$)).toEqual([
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });

  it('should throw error if recipe is already present', () => {
    const { mealPlanner } = createMealPlannerWithBurger();

    expect(() => mealPlanner.addRecipe(burger)).toThrowError(
      `Can't add recipe.`
    );
  });

  it.todo('🚧 should add recipe to meal repository');

  describe('recipes$', () => {
    it('should emit empty array when no recipes', async () => {
      const { mealPlanner } = createMealPlanner();

      const observer = observe(mealPlanner.recipes$);

      expect(observer.next).toBeCalledTimes(1);
      expect(observer.next).toBeCalledWith([]);
    });

    it('should emit recipes when added', () => {
      const { mealPlanner } = createMealPlanner();

      const observer = observe(mealPlanner.recipes$);

      observer.mockClear();

      mealPlanner.addRecipe(burger);
      mealPlanner.addRecipe(salad);

      expect(observer.next).toBeCalledTimes(2);
      expect(observer.next).nthCalledWith(1, [
        expect.objectContaining({ name: 'Burger' }),
      ]);
      expect(observer.next).nthCalledWith(2, [
        expect.objectContaining({ name: 'Burger' }),
        expect.objectContaining({ name: 'Salad' }),
      ]);
    });
  });

  describe('watchCanAddRecipe()', () => {
    it('should instantly emit if recipe can be added', () => {
      const { mealPlanner } = createMealPlanner();

      const observer = observe(mealPlanner.watchCanAddRecipe(burger));

      expect(observer.next).toBeCalledTimes(1);
      expect(observer.next).toBeCalledWith(true);
    });

    it(`should emit false when recipe is added and can't be added anymore`, () => {
      const { mealPlanner } = createMealPlanner();

      const observer = observe(mealPlanner.watchCanAddRecipe(burger));

      observer.mockClear();

      mealPlanner.addRecipe(burger);

      expect(observer.next).toBeCalledTimes(1);
      expect(observer.next).toBeCalledWith(false);
    });

    it(`should not emit if result didn't change`, () => {
      const { mealPlanner } = createMealPlanner();

      const observer = observe(mealPlanner.watchCanAddRecipe(burger));

      mealPlanner.addRecipe(burger);

      observer.mockClear();

      mealPlanner.addRecipe(salad);

      expect(observer.next).not.toBeCalled();
    });
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
