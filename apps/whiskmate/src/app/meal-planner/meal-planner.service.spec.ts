import { TestBed } from '@angular/core/testing';
import { Recipe } from './../recipe/recipe';
import { MealPlanner } from './meal-planner.service';

describe(MealPlanner.name, () => {
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

    const observer = jest.fn();
    mealPlanner.recipes$.subscribe(observer);

    mealPlanner.addRecipe(papperdelle);
    mealPlanner.addRecipe(puyLentil);

    expect(observer).toBeCalledTimes(3);
    expect(observer).toHaveBeenNthCalledWith(1, []);
    expect(observer).toHaveBeenNthCalledWith(2, [
      expect.objectContaining({ id: 'papperdelle-with-rose-harissa' }),
    ]);
    expect(observer).toHaveBeenNthCalledWith(3, [
      expect.objectContaining({ id: 'papperdelle-with-rose-harissa' }),
      expect.objectContaining({ id: 'puy-lentil-and-aubergine-stew' }),
    ]);
  });

  it('should watch if recipe can be added', () => {
    const { mealPlanner, papperdelle } = harness;

    const observer = jest.fn();
    mealPlanner.watchCanAddRecipe(papperdelle).subscribe(observer);

    mealPlanner.addRecipe(papperdelle);

    expect(observer).toBeCalledTimes(2);
    expect(observer).toBeCalledWith(true);
    expect(observer).toBeCalledWith(false);
  });

  it("should not trigger observable if result didn't change", () => {
    const { mealPlanner, papperdelle, puyLentil } = harness;

    const observer = jest.fn();
    mealPlanner.watchCanAddRecipe(papperdelle).subscribe(observer);

    mealPlanner.addRecipe(papperdelle);
    mealPlanner.addRecipe(puyLentil);

    expect(observer).toBeCalledTimes(2);
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
