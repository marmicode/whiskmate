interface Recipe {
  id: string;
  name: string;
}

function createRecipe(recipe: Recipe): Recipe {
  return recipe;
}

class RecipeRepository {
  private _recipes: Recipe[] = [];

  async addRecipe(recipe: Recipe) {
    this._recipes = [...this._recipes, recipe];
  }

  async getRecipes() {
    return this._recipes;
  }

  async removeRecipe(recipeId: string) {
    const previousCount = this._recipes.length;

    this._recipes = this._recipes.filter((recipe) => recipe.id !== recipeId);

    /* Check new recipes length to know if recipe has been removed. */
    if (previousCount === this._recipes.length) {
      throw new Error('Recipe not found.');
    }
  }
}

describe(RecipeRepository.name, () => {
  const burger = createRecipe({ id: 'burger', name: '🍔 Burger' });
  const salad = createRecipe({ id: 'salad', name: '🥗 Salad' });

  let recipeRepository: RecipeRepository;

  beforeEach(() => (recipeRepository = new RecipeRepository()));

  describe('without recipes', () => {
    it('should get empty recipes list', async () => {
      expect(await recipeRepository.getRecipes()).toEqual([]);
    });

    it('should add recipe', async () => {
      await recipeRepository.addRecipe(burger);

      expect(await recipeRepository.getRecipes()).toEqual([
        expect.objectContaining({
          name: '🍔 Burger',
        }),
      ]);
    });

    it('should add recipe and respect immutability', async () => {
      const recipes = await recipeRepository.getRecipes();

      await recipeRepository.addRecipe(burger);

      expect(recipes).toEqual([]);
    });
  });

  describe('with recipes', () => {
    beforeEach(async () => {
      await recipeRepository.addRecipe(burger);
      await recipeRepository.addRecipe(salad);
    });

    it('should get recipes', async () => {
      expect(await recipeRepository.getRecipes()).toEqual([
        expect.objectContaining({
          name: '🍔 Burger',
        }),
        expect.objectContaining({
          name: '🥗 Salad',
        }),
      ]);
    });

    it('should remove recipe', async () => {
      expect(await recipeRepository.removeRecipe('burger'));
      expect(await recipeRepository.getRecipes()).toEqual([
        expect.objectContaining({
          name: '🥗 Salad',
        }),
      ]);
    });

    it('should remove recipe and respect immutability', async () => {
      const recipes = await recipeRepository.getRecipes();

      expect(await recipeRepository.removeRecipe('burger'));

      expect(recipes.length).toEqual(2);
    });

    it('should reject promise when removing unexisting recipe', () => {
      expect(() =>
        recipeRepository.removeRecipe('unexisting-recipe')
      ).rejects.toThrowError(/Recipe not found./);
    });
  });
});
