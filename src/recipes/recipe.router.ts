import { del, get, post } from '../helpers/typed-express';
import {
  RecipeNotFoundError,
  RecipeData,
  Recipe,
} from './recipe-repository-common';
import { Router } from 'express';
import { getRecipeRepository } from './recipe-repository';

interface List<T> {
  total: number;
  items: T[];
}

export const recipeRouter = Router();

const repository = getRecipeRepository();

/**
 * Create recipe.
 */
post<RecipeData, Recipe>(recipeRouter)('/recipes', async (req, res) => {
  const recipe = await repository.addRecipe(req.body);
  res.status(201).send(recipe);
});

/**
 * Retrieve recipes.
 */
get<List<Recipe>>(recipeRouter)('/recipes', async (_, res) => {
  const recipes = await repository.getRecipes();
  res.send({
    total: recipes.length,
    items: recipes,
  });
});

/**
 * Remove recipe.
 */
del(recipeRouter)('/recipes/:recipeId', async (req, res) => {
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
