import { addRecipe, getRecipes } from '@whiskmate/backend/whiskmate-core';
import { Recipe } from '@whiskmate/backend/whiskmate-restful-core';
import { json } from 'body-parser';
import * as express from 'express';
import { Router } from 'express';

const app = express();

app.use(json({ type: 'application/json' }));

const recipesRouter = Router();

recipesRouter.get('/', async (req, res) => {
  const recipes = await getRecipes();
  res.send(
    recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
    })) as Recipe[]
  );
});

recipesRouter.post('/', async (req, res) => {
  const recipe = await addRecipe(req.body);
  res.send(recipe);
});

app.use('/recipes', recipesRouter);

const port = process.env.port ?? 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
