import { post } from './../utils/typed-express';
import { Router } from 'express';
import {
  IngredientRepository,
  IngredientData,
  Ingredient,
} from './ingredient-repository';
import { EventEmitter } from 'events';

export const ingredientRouter = Router();

const recipeChangesBus = new EventEmitter();
const ingredientRepository = new IngredientRepository();

ingredientRouter.get('/recipes/:recipeId/ingredient-changes', (req, res) => {
  res
    .status(200)
    .header('Content-Type', 'text/event-stream')
    .header('Connection', 'keep-alive')
    .header('Cache-Control', 'no-cache');

  const recipeId = req.params.recipeId;

  const ingredients = ingredientRepository.getRecipeIngredients(recipeId);

  const sendIngredient = (ingredient: Ingredient) => {
    const data = `data: ${JSON.stringify(ingredient)}\n\n`;
    res.write(data);
  };

  for (const ingredient of ingredients) {
    sendIngredient(ingredient);
  }

  recipeChangesBus.on(recipeId, sendIngredient);

  req.socket.on('close', () =>
    recipeChangesBus.removeListener(recipeId, sendIngredient)
  );
});

post<IngredientData, Ingredient>(ingredientRouter)(
  '/recipes/:recipeId/ingredients',
  (req, res) => {
    const recipeId = req.params.recipeId;

    const ingredient = ingredientRepository.addIngredient({
      recipeId: recipeId,
      ingredientData: req.body,
    });

    recipeChangesBus.emit(req.params.recipeId, ingredient);

    res.status(201).send(ingredient);
  }
);

ingredientRouter.patch('/ingredients/:ingredientId', (req, res) => {
  const ingredientId = req.params.ingredientId;
  const recipeId = ingredientRepository.getIngredientRecipeId(ingredientId);

  if (recipeId == null) {
    res.sendStatus(404);
    return;
  }

  const changes = req.body;

  ingredientRepository.updateIngredient({
    ingredientId: req.params.ingredientId,
    changes: changes,
  });

  recipeChangesBus.emit(recipeId, {
    ...changes,
    id: ingredientId,
  });

  res.sendStatus(200);
});
