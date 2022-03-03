class RecipeRepository {
  #recipes = [];

  addRecipe(recipe) {
    this.#recipes.push(recipe);
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
  const burger = { id: 'burger', name: '🍔 Burger' };
  const salad = { id: 'salad', name: '🥗 Salad' };

  let recipeRepository;

  beforeEach(() => (recipeRepository = new RecipeRepository()));

  describe('without recipes', () => {
    it('should get empty recipes list', () => {
      expect(recipeRepository.getRecipes()).toEqual([]);
    });

    it('should add recipe', () => {
      recipeRepository.addRecipe(burger);

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
    beforeEach(() => {
      recipeRepository.addRecipe(burger);
      recipeRepository.addRecipe(salad);
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
      expect(recipeRepository.removeRecipe('burger'));
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
