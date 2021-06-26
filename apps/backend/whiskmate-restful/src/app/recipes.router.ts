import { Recipe } from '@whiskmate/backend/whiskmate-core';
import { getRecipes, addRecipe } from '@whiskmate/backend/whiskmate-core';
import * as openapi from '@whiskmate/backend/whiskmate-restful-core';
import { Router } from 'express';

export const recipesRouter = Router();

recipesRouter.get('/', async (req, res) => {
  const recipes = await getRecipes();
  res.send(recipes.map((recipe) => toRecipeDto(recipe)));
});

recipesRouter.post('/', async (req, res) => {
  const recipe = await addRecipe(req.body as openapi.RecipeRequest);
  res.send(toRecipeDto(recipe));
});

export function toRecipeDto(recipe: Recipe): openapi.Recipe {
  return {
    id: recipe.id,
    name: recipe.name,
  };
}
