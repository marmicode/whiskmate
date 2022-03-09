const { nanoid } = require('nanoid');

class RecipeRepository {
  #recipes = [];

  addRecipe(recipeData) {
    const recipe = { ...recipeData, id: nanoid() };
    this.#recipes = [...this.#recipes, recipe];
    return recipe;
  }

  getRecipes() {
    return this.#recipes;
  }

  removeRecipe(recipeId) {
    this.#recipes = this.#recipes.filter((recipe) => recipe.id !== recipeId);
  }
}

describe(RecipeRepository.name, () => {
  const burgerData = { name: '🍔 Burger' };
  const saladData = { name: '🥗 Salad' };

  let recipeRepository;

  beforeEach(() => (recipeRepository = new RecipeRepository()));

  describe('without recipes', () => {
    it('should get empty recipes list', async () => {
      expect(await recipeRepository.getRecipes()).toEqual([]);
    });

    it('should add recipe', async () => {
      await recipeRepository.addRecipe(burgerData);

      expect(await recipeRepository.getRecipes()).toEqual([
        expect.objectContaining({
          name: '🍔 Burger',
        }),
      ]);
    });

    it('should add recipe and respect immutability', async () => {
      const recipes = await recipeRepository.getRecipes();

      await recipeRepository.addRecipe(burgerData);

      expect(recipes).toEqual([]);
    });
  });

  describe('with recipes', () => {
    beforeEach(async () => {
      const burger = await recipeRepository.addRecipe(burgerData);
      await recipeRepository.addRecipe(saladData);

      /* Remember burger id to remove it later. */
      burgerId = burger.id;
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
      expect(await recipeRepository.removeRecipe(burgerId));
      expect(await recipeRepository.getRecipes()).toEqual([
        expect.objectContaining({
          name: '🥗 Salad',
        }),
      ]);
    });

    it('should remove recipe and respect immutability', async () => {
      const recipes = await recipeRepository.getRecipes();

      expect(await recipeRepository.removeRecipe(burgerId));

      expect(recipes.length).toEqual(2);
    });

    xit('should reject promise when removing unexisting recipe', async () => {
      await expect(
        recipeRepository.removeRecipe('unexisting-recipe')
      ).rejects.toThrow(/Recipe not found./);
    });
  });
});
