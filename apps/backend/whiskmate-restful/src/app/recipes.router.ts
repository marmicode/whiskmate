import { getRecipes, addRecipe } from '@whiskmate/backend/whiskmate-core';
import * as openapi from '@whiskmate/backend/whiskmate-restful-core';
import { Router } from 'express';

export const recipesRouter = Router();

recipesRouter.get('/', async (req, res) => {
  const recipes = await getRecipes();
  res.send(
    recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
    })) as openapi.Recipe[]
  );
});

recipesRouter.post('/', async (req, res) => {
  const recipe = await addRecipe(req.body);
  res.send(recipe as openapi.Recipe);
});
