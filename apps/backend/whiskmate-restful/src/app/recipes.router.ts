import {
  addRecipe,
  getRecipe,
  getRecipes,
  Recipe,
} from '@whiskmate/backend/whiskmate-core';
import * as openapi from '@whiskmate/backend/whiskmate-restful-core';
import { Router } from 'express';
import { defer } from 'rxjs';
import { retry } from 'rxjs/operators';

export const recipesRouter = Router();

recipesRouter.get('/recipes', async (req, res) => {
  const recipes = await defer(() => getRecipes())
    .pipe(retry(3))
    .toPromise();
  res.send(recipes.map((recipe) => toRecipeDto(recipe)));
});

recipesRouter.post('/recipes', async (req, res) => {
  const recipe = await addRecipe(req.body as openapi.RecipeRequest);
  res.send(toRecipeDto(recipe));
});

recipesRouter.get('/recipes/:recipeId', async (req, res) => {
  const recipe = await getRecipe({ recipeId: req.params.recipeId });

  recipe ? res.send(toRecipeDto(recipe)) : res.sendStatus(404);
});

export function toRecipeDto(recipe: Recipe): openapi.Recipe {
  return {
    id: recipe.id,
    name: recipe.name,
  };
}
