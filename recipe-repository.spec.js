class RecipeRepository {
  #recipes = [];

  async addRecipe(recipe) {
    this.#recipes = [...this.#recipes, recipe];
  }

  async getRecipes() {
    return this.#recipes;
  }

  async removeRecipe(recipeId) {
    const previousCount = this.#recipes.length;

    this.#recipes = this.#recipes.filter((recipe) => recipe.id !== recipeId);

    /* Check new recipes length to know if recipe has been removed. */
    if (previousCount === this.#recipes.length) {
      throw new Error('Recipe not found.');
    }
  }
}

describe(RecipeRepository.name, () => {
  const burger = { id: 'burger', name: '🍔 Burger' };
  const salad = { id: 'salad', name: '🥗 Salad' };

  let recipeRepository;

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
