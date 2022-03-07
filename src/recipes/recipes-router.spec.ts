import * as express from 'express';
import * as request from 'supertest';
import { getRecipeRepository } from './recipe-repository';
import { RecipeData } from './recipe-repository-common';
import { RecipeRepositoryMemory } from './recipe-repository-memory';
import { recipesRouter } from './recipes-router';

jest.mock('./recipe-repository');
const mockGetRecipeRepository = getRecipeRepository as jest.MockedFunction<
  typeof getRecipeRepository
>;

describe('Recipes Router', () => {
  describe('without recipes', () => {
    beforeEach(() => withRecipes([]));

    describe('GET /recipes', () => {
      xit('🚧 should return 403 if scope recipe.read is missing', async () => {
        const client = createTestClient({
          scope: [],
        });
        const { status } = await client.get('/recipes');
        expect(status).toEqual(403);
      });
    });

    describe('POST /recipes', () => {
      xit('🚧 should return 403 if scope recipe.read is missing', async () => {
        const client = createTestClient({
          scope: [],
        });
        const { status } = await client.post('/recipes').send({});
        expect(status).toEqual(403);
      });
    });

    describe('DELETE /recipes/:recipeId', () => {
      it('should return 404 if recipe is not found', async () => {
        const client = createTestClient();
        const { status, body } = await client.delete('/recipes/unknown-recipe');
        expect(status).toEqual(404);
        expect(body).toEqual({
          type: 'https://whiskmate.io/problems/recipe-not-found',
          title: 'Recipe not found',
          detail: `Recipe unknown-recipe not found.`,
        });
      });

      xit('🚧 should return 403 if scope recipe.write is missing', async () => {
        const client = createTestClient({
          scope: ['recipe.read'],
        });
        const { status } = await client.delete('/recipes/some-recipe');
        expect(status).toEqual(403);
      });
    });
  });

  describe('with some recipes', () => {
    let burgerId: string;

    beforeEach(async () => {
      const recipes = await withRecipes([
        { name: '🍔 Burger' },
        { name: '🥗 Salad' },
      ]);
      burgerId = recipes[0].id;
    });

    describe('GET /recipes', () => {
      it('should return all recipes', async () => {
        const client = createTestClient();
        const { status, body } = await client.get('/recipes');
        expect(status).toEqual(200);
        expect(body).toEqual({
          total: 2,
          items: [
            expect.objectContaining({
              name: '🍔 Burger',
            }),
            expect.objectContaining({
              name: '🥗 Salad',
            }),
          ],
        });
      });
    });

    describe('DELETE /recipes/:recipeId', () => {
      it('should remove recipe', async () => {
        const client = createTestClient();
        const { status } = await client.delete(`/recipes/${burgerId}`);
        expect(status).toEqual(204);
      });
    });
  });

  async function withRecipes(recipeDataList: RecipeData[]) {
    const recipeRepository = new RecipeRepositoryMemory();
    const recipes = await Promise.all(
      recipeDataList.map((data) => recipeRepository.addRecipe(data))
    );
    mockGetRecipeRepository.mockReturnValue(recipeRepository);
    return recipes;
  }

  function createTestClient({
    scope = ['recipe.read', 'recipe.write'],
  }: {
    scope?: string[];
  } = {}) {
    const app = express();
    app.use((req, res, next) => {
      req.user = {
        id: 'foobar',
      };
      req.authInfo = {
        scope,
      };
      next();
    });
    app.use(recipesRouter);
    return request(app);
  }
});
