import { TestBed } from '@angular/core/testing';
import { createObserver } from '../../testing/observer';
import { Recipe } from './../recipe/recipe';
import { MealPlanner } from './meal-planner.service';

describe(MealPlanner.name, () => {
  const { observe } = createObserver();

  let harness: ReturnType<typeof createHarness>;
  beforeEach(() => (harness = createHarness()));

  it('should add recipe', () => {
    const { mealPlanner, papperdelle, puyLentil } = harness;

    mealPlanner.addRecipe(papperdelle);
    mealPlanner.addRecipe(puyLentil);

    expect(mealPlanner.getRecipes()).toEqual([
      expect.objectContaining({ id: 'papperdelle-with-rose-harissa' }),
      expect.objectContaining({ id: 'puy-lentil-and-aubergine-stew' }),
    ]);
  });

  it('should watch recipes', () => {
    const { mealPlanner, papperdelle, puyLentil } = harness;

    const observer = observe(mealPlanner.recipes$);

    mealPlanner.addRecipe(papperdelle);
    mealPlanner.addRecipe(puyLentil);

    expect(observer.next).toBeCalledTimes(3);
    expect(observer.next).toHaveBeenNthCalledWith(1, []);
    expect(observer.next).toHaveBeenNthCalledWith(2, [
      expect.objectContaining({ id: 'papperdelle-with-rose-harissa' }),
    ]);
    expect(observer.next).toHaveBeenNthCalledWith(3, [
      expect.objectContaining({ id: 'papperdelle-with-rose-harissa' }),
      expect.objectContaining({ id: 'puy-lentil-and-aubergine-stew' }),
    ]);
  });

  it('should watch if recipe can be added', () => {
    const { mealPlanner, papperdelle } = harness;

    const observer = observe(mealPlanner.watchCanAddRecipe(papperdelle));

    mealPlanner.addRecipe(papperdelle);

    expect(observer.next).toBeCalledTimes(2);
    expect(observer.next).toBeCalledWith(true);
    expect(observer.next).toBeCalledWith(false);
  });

  it("should not trigger observable if result didn't change", () => {
    const { mealPlanner, papperdelle, puyLentil } = harness;

    const observer = observe(mealPlanner.watchCanAddRecipe(papperdelle));

    mealPlanner.addRecipe(papperdelle);
    mealPlanner.addRecipe(puyLentil);

    expect(observer.next).toBeCalledTimes(2);
  });

  describe('with recipe', () => {
    beforeEach(() => {
      const { mealPlanner, papperdelle } = harness;
      mealPlanner.addRecipe(papperdelle);
    });

    it('should not allow recipe duplicates', () => {
      const { mealPlanner, papperdelle } = harness;
      expect(mealPlanner.canAddRecipe(papperdelle)).toBe(false);
    });

    it('should allow new recipes', () => {
      const { mealPlanner, puyLentil } = harness;
      expect(mealPlanner.canAddRecipe(puyLentil)).toBe(true);
    });

    it('should throw error if recipe is already present', () => {
      const { mealPlanner, papperdelle } = harness;
      expect(() => mealPlanner.addRecipe(papperdelle)).toThrowError(
        `Can't add recipe.`
      );
    });
  });

  function createHarness() {
    return {
      mealPlanner: TestBed.inject(MealPlanner),
      papperdelle: { id: 'papperdelle-with-rose-harissa' } as Recipe,
      puyLentil: { id: 'puy-lentil-and-aubergine-stew' } as Recipe,
    };
  }
});
