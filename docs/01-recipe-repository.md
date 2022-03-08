# Setup

```sh
git checkout origin/nodejs-00-boilerplate

yarn
```

# 🎯 Goal: Implement `RecipeRepository`

`RecipeRepository` is a stateful service that stores recipes.
`RecipeRepository` has the following methods:

1. `addRecipe(recipeData)`: adds a recipe.
2. `getRecipes()`: returns recipes.
3. `removeRecipe(recipeId)`: removes a recipe by id.

# 📝 Steps

1. Run tests: `yarn test:watch` (or `npm run test:watch`).

2. Activate tests by replacing `xdescribe` with `describe`.

3. Open `recipe-repository.spec.ts`.

4. Make tests pass.

# 🎁 Tips

## Generate random id

You can use `nanoid` to generate random unique IDs:

```ts
const { nanoid } = require('nanoid');
const randomId = nanoid();
```
