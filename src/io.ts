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

  io.of('/ingredients').on('connection', (socket) => {
    const recipeId = socket.handshake.query.recipeId as string;
    const recipeIngredientsRoom = `/recipes/${recipeId}/ingredients`;
    socket.join(recipeIngredientsRoom);

    const ingredients = ingredientRepository.getRecipeIngredients(recipeId);

    socket.emit('ingredients-loaded', { ingredients });

    socket.on('ingredient-added', ({ ingredient }) =>
      ingredientRepository.addIngredient({ recipeId, ingredient })
    );

    socket.on('ingredient-changed', ({ ingredientId, changes }) => {
      ingredientRepository.updateIngredient({
        ingredientId,
        changes,
      });
    });

    socket.onAny((eventName, event) => {
      socket.to(recipeIngredientsRoom).emit(eventName, event);
    });
  });
}
