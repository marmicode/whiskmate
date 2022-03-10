import { IngredientRepository } from './ingredients/ingredient-repository';
import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

export function setupIoServer(httpServer: HttpServer) {
  const ingredientRepository = new IngredientRepository();

  const io = new Server(httpServer, {
    cors: {
      methods: ['GET'],
    },
  });

  const namespace = io.of('/ingredients');

  namespace.on('connection', async (socket) => {
    const recipeId = socket.handshake.query.recipeId as string;
    const recipeIngredientsRoom = `/recipes/${recipeId}/ingredients`;
    await socket.join(recipeIngredientsRoom);

    socket.emit('ingredients-loaded', {
      ingredients: ingredientRepository.getRecipeIngredients(recipeId),
    });

    socket.on('add-ingredient', ({ ingredientData }) => {
      const ingredient = ingredientRepository.addIngredient({
        recipeId,
        ingredientData,
      });

      /* Send to everyone in the room including sender as they
       * need the id. */
      namespace
        .to(recipeIngredientsRoom)
        .emit('ingredient-added', { ingredient });
    });

    socket.on('ingredient-changed', (event) => {
      const { ingredientId, changes } = event;

      ingredientRepository.updateIngredient({
        ingredientId,
        changes,
      });

      /* Send to friends in the same room. */
      socket.to(recipeIngredientsRoom).emit('ingredient-changed', event);
    });
  });
}
