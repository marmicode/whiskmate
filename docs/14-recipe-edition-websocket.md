# Setup

```sh
git checkout origin/nodejs-26-recipe-edition-websocket-boilerplate

yarn
```

# 🎯 Goal: Sync users using websockets

- Send new ingredients to other users.
- Send ingredient changes to other users.
- Send events only to users who are interested in the same recipe.

# 📝 Steps

1. Start the kichen app + server: `yarn start` (or `npm start`) and go to [http://localhost:8000](http://localhost:8000).

2. Edit kitchen app (`src/kitchen/recipe.mjs`) to send events to the server:

```ts
socket.emit('ingredient-added', { ingredient });
```

1. Edit kitchen app to handle events recieved from the server:

```ts
socket.on('ingredient-added', ({ ingredient }) => {
  // ...
});
```

4. Handle events on the server (`src/io.ts`) and update ingredient repository:

```ts
const repo = new IngredientRepository();

socket.on('ingredient-added', ({ ingredient }) => {
  repo.addIngredient({ recipeId, ingredient }); // 🤔 but how do we get the recipeId?
});

socket.on('...', (...) => {
  repo.updateIngredient({ ingredientId, changes });
});
```

5. Update kitchen app to send `recipeId` as a query parameter:

```ts
io('...', {
  query: {
    recipeId: '...'
  }
});
})
```

6. Update server to read `recipeId` from the query parameter:

```ts
const recipeId = socket.handshake.query.recipeId;
```

7. Finish step 5 😉.

8. Send recipe ingredients to users on connection:

```ts
const ingredients = repo.getIngredients({ recipeId });
```

9.  Make users join a new room per recipe and forward messages to the same room only:

```ts
/* Create a unique room name per recipe. */
const room = `/recipes/${recipeId}/ingredients`;

/* Socket joins room. */
socket.join(room);

socket.to(room).emit('...', { ... }); // emits event to all users in the room except to socket
io.to(room).emit('...', { ... }); // emits event to all users in the room including to socket
```
