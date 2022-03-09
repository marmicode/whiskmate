import { createTmpDir } from '../helpers/create-tmp-dir';
import { RecipeNotFoundError, RecipeRepository } from './recipe-repository-common';
import { RecipeRepositoryFilesystem } from './recipe-repository-filesystem';
import { RecipeRepositoryMemory } from './recipe-repository-memory';

describe.each([
  [
    RecipeRepositoryMemory.name,
    {
      async createRecipeRepository() {
        return { repo: new RecipeRepositoryMemory(), async destroy() {} };
      },
    },
  ],
  [
    RecipeRepositoryFilesystem.name,
    {
      async createRecipeRepository() {
        const { path, destroy } = await createTmpDir();

        return {
          repo: new RecipeRepositoryFilesystem(path),
          destroy,
        };
      },
    },
  ],
])('%s', (_, { createRecipeRepository }) => {
  const burgerData = { name: '🍔 Burger' };
  const saladData = { name: '🥗 Salad' };

  let recipeRepository: RecipeRepository;
  let destroyRecipeRepository: () => Promise<void>;

  beforeEach(async () => {
    const { repo, destroy } = await createRecipeRepository();
    recipeRepository = repo;
    destroyRecipeRepository = destroy;
  });

  afterEach(() => destroyRecipeRepository());

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
      expect(await recipeRepository.getRecipes()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: '🍔 Burger',
          }),
          expect.objectContaining({
            name: '🥗 Salad',
          }),
        ])
      );
    });

    it('should get recipes and expose recipe id', async () => {
      expect(await recipeRepository.getRecipes()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: burgerId,
          }),
          expect.objectContaining({
            id: expect.any(String),
          }),
        ])
      );
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

    it('should reject promise when removing unexisting recipe', async () => {
      await expect(
        recipeRepository.removeRecipe('unexisting-recipe')
      ).rejects.toThrow(new RecipeNotFoundError('unexisting-recipe'));
    });
  });
});
