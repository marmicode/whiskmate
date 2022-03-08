# Setup

```sh
git checkout origin/nodejs-03-recipe-repository-immutability-boilerplate

yarn
```

# 🎯 Goal: Make `RecipeRepository` respect immutability

`RecipeRepository`'s methods should respect immutability.

# 📝 Steps

1. Run tests: `yarn test:watch` (or `npm run test:watch`).

2. Activate tests by replacing `xit` with `it`.

3. Make tests pass.

# 🎁 Tips

## Array immutability

Spreading (e.g. `[...l, value]`) and `Array.filter` can help respecting immutability.
