import { Recipe } from './../recipe/recipe';
import { MealPlanner } from './meal-planner.service';

describe(MealPlanner.name, () => {
  let mealPlanner: MealPlanner;
  const papperdelle = { id: 'papperdelle-with-rose-harissa' } as Recipe;
  const puyLentil = { id: 'puy-lentil-and-aubergine-stew' } as Recipe;

  beforeEach(() => (mealPlanner = new MealPlanner()));

  it('should add recipe', () => {
    mealPlanner.addRecipe(papperdelle);
    mealPlanner.addRecipe(puyLentil);

    expect(mealPlanner.getRecipes()).toEqual([
      expect.objectContaining({ id: 'papperdelle-with-rose-harissa' }),
      expect.objectContaining({ id: 'puy-lentil-and-aubergine-stew' }),
    ]);
  });

  describe('with recipe', () => {
    beforeEach(() => {
      mealPlanner.addRecipe(papperdelle);
    });

    it('should not allow recipe duplicates', () => {
      expect(mealPlanner.canAddRecipe(papperdelle)).toBe(false);
    });

    it('should allow new recipes', () => {
      expect(mealPlanner.canAddRecipe(puyLentil)).toBe(true);
    });

    it('should throw error if recipe is already present', () => {
      expect(() => mealPlanner.addRecipe(papperdelle)).toThrowError(
        `Can't add recipe.`
      );
    });
  });
});
