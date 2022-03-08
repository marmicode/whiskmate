# Setup

```sh
git checkout origin/nodejs-13-recipe-api-boilerplate

yarn
```

# 🎯 Goal: Implement recipe management API

- Add `POST /recipes` route to create recipes.
- Add `GET /recipes` route to list recipes.
- Add `DELETE /recipe/:recipeId` route to delete recipes.

# 📝 Steps

1. Create new router in `src/recipes/recipe-router.ts`.

```ts
export const recipesRouter = Router();

recipesRouter.post('/recipes', ...);
recipesRouter.get('/recipes', ...);
recipesRouter.delete('/recipes/:recipeId', ...);
```

2. Use router in `src/main.ts`.

```ts
app.use(recipesRouter);
```

3. Grab a repository instance using `getRecipeRepository()` from `src/recipes/recipe-repository.ts`.

4. Make sure `DELETE /recipes/:recipeId` returns 404 if recipe doesn't exist.

# 🎁 Tips

## Think about handling errors

```ts
app.use((err: unknown, req: unknown, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({
    type: 'https://whiskmate.io/problems/unknown-error',
    title: 'Unknown Error',
  });
});
```
