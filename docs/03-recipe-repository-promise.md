# Setup

```sh
git checkout origin/nodejs-05-recipe-repository-promise-boilerplate

yarn
```

# 🎯 Goal: Make `RecipeRepository` async

`RecipeRepository`'s methods should return promises.
`RecipeRepository.removeRecipe()` should reject if the recipe doesn't exist.

# 📝 Steps

1. Run tests: `yarn test:watch` (or `npm run test:watch`).

2. Activate tests by replacing `xit` with `it`.

3. Make tests pass.

# 🎁 Tips

## Create a promise synchronously

You can create a promise synchronously from an existing value using `Promise.resolve`:

```ts
const promise = Promise.resolve(42);
```

Same applies for rejected values:

```ts
const promise = Promise.reject(new Error('Oops'));
```
