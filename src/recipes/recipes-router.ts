import { RecipeNotFoundError } from './recipe-repository-common';
import { Router } from 'express';
import { getRecipeRepository } from './recipe-repository';

export const recipesRouter = Router();

const repository = getRecipeRepository();

/**
 * Create recipe.
 */
recipesRouter.post('/recipes', async (req, res) => {
  const recipe = await repository.addRecipe(req.body);
  res.status(201).send(recipe);
});

/**
 * Retrieve recipes.
 */
recipesRouter.get('/recipes', async (_, res) => {
  const recipes = await repository.getRecipes();
  res.send({
    total: recipes.length,
    items: recipes,
  });
});

/**
 * Remove recipe.
 */
recipesRouter.delete('/recipes/:recipeId', async (req, res) => {
  try {
    await repository.removeRecipe(req.params.recipeId);
    res.sendStatus(204);
  } catch (e) {
    if (e instanceof RecipeNotFoundError) {
      res.status(404);
      res.send({
        type: 'https://whiskmate.io/problems/recipe-not-found',
        title: 'Recipe not found',
        detail: `Recipe ${e.recipeId} not found.`,
      });
      return;
    }

    throw e;
  }
});
