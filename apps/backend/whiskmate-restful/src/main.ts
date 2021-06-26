import { getRecipes } from '@whiskmate/backend/whiskmate-core';
import { Recipe } from '@whiskmate/backend/whiskmate-restful-core';
import { json } from 'body-parser';
import * as express from 'express';

const app = express();

app.use(json({ type: 'application/json' }));

app.get('/recipes', async (req, res) => {
  const recipes = await getRecipes();
  res.send(
    recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
    })) as Recipe[]
  );
});

const port = process.env.port ?? 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
