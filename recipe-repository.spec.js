const { nanoid } = require('nanoid');

class RecipeRepository {
  #recipes = [];

  addRecipe(recipeData) {
    const recipe = { ...recipeData, id: nanoid() };
    this.#recipes.push(recipe);
    return recipe;
  }

  getRecipes() {
    return this.#recipes;
  }

  removeRecipe(recipeId) {
    const recipeIndex = this.#recipes.findIndex(
      (recipe) => recipe.id === recipeId
    );
    this.#recipes.splice(recipeIndex, 1);
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

    xit('should add recipe and respect immutability', () => {
      const recipes = recipeRepository.getRecipes();

      recipeRepository.addRecipe(burger);

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

    xit('should remove recipe and respect immutability', () => {
      const recipes = recipeRepository.getRecipes();

      expect(recipeRepository.removeRecipe('burger'));

      expect(recipes.length).toEqual(2);
    });
  });
});
