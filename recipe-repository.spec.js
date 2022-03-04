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
    it('should get empty recipes list', () => {
      expect(recipeRepository.getRecipes()).toEqual([]);
    });

    it('should add recipe', () => {
      recipeRepository.addRecipe(burgerData);

      expect(recipeRepository.getRecipes()).toEqual([
        expect.objectContaining({
          name: '🍔 Burger',
        }),
      ]);
    });

    it('should add recipe and respect immutability', () => {
      const recipes = recipeRepository.getRecipes();

      recipeRepository.addRecipe(burgerData);

      expect(recipes).toEqual([]);
    });
  });

  describe('with recipes', () => {
    let burgerId;

    beforeEach(() => {
      const burger = recipeRepository.addRecipe(burgerData);
      recipeRepository.addRecipe(saladData);

      /* Remember burger id to remove it later. */
      burgerId = burger.id;
    });

    it('should get recipes', () => {
      expect(recipeRepository.getRecipes()).toEqual([
        expect.objectContaining({
          name: '🍔 Burger',
        }),
        expect.objectContaining({
          name: '🥗 Salad',
        }),
      ]);
    });

    it('should remove recipe', () => {
      expect(recipeRepository.removeRecipe(burgerId));
      expect(recipeRepository.getRecipes()).toEqual([
        expect.objectContaining({
          name: '🥗 Salad',
        }),
      ]);
    });

    it('should remove recipe and respect immutability', () => {
      const recipes = recipeRepository.getRecipes();

      expect(recipeRepository.removeRecipe(burgerId));

      expect(recipes.length).toEqual(2);
    });
  });
});
