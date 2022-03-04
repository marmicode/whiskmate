import { RecipeRepository } from './recipe-repository';
import { nanoid } from 'nanoid';

describe(RecipeRepository.name, () => {
  const burgerData = { name: '🍔 Burger' };
  const saladData = { name: '🥗 Salad' };

  let recipeRepository: RecipeRepository;

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
    let burgerId: string;

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

    it('should reject promise when removing unexisting recipe', () => {
      expect(() =>
        recipeRepository.removeRecipe('unexisting-recipe')
      ).rejects.toThrowError(/Recipe not found./);
    });
  });
});
