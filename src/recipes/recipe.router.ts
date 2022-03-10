import { Router } from 'express';
import { del, get, post } from '../helpers/typed-express';
import { Recipe } from '../openapi/model/recipe';
import { RecipeList } from '../openapi/model/recipe-list';
import { Problem } from '../openapi/model/problem';
import { RecipeRequest } from '../openapi/model/recipe-request';
import { getRecipeRepository } from './recipe-repository';
import { RecipeNotFoundError } from './recipe-repository-common';

export const recipeRouter = Router();

const repository = getRecipeRepository();

/**
 * Create recipe.
 */
post<RecipeRequest, Recipe>(recipeRouter)('/recipes', async (req, res) => {
  const recipe = await repository.addRecipe(req.body);
  res.status(201).send(recipe);
});

/**
 * Retrieve recipes.
 */
get<RecipeList>(recipeRouter)('/recipes', async (_, res) => {
  const recipes = await repository.getRecipes();
  res.send({
    total: recipes.length,
    items: recipes,
  });
});

/**
 * Remove recipe.
 */
del<Problem>(recipeRouter)('/recipes/:recipeId', async (req, res) => {
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
