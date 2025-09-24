# Setup

```sh
git switch testing-401-recipe-filter-starter
```

# 🎯 Goal: Test `RecipeFilter`

New component `RecipeFilter` should trigger `filterChange` output with a value of type `RecipeFilterCriteria`.

This will be later used by `RecipeSearch` to filter results based on user filtering.

## 📝 Steps

0. [optional] you can either checkout the updated `RecipeFilter` implementation first or go full-on TDD and implement the tests first.

```sh
git checkout origin/testing-401-recipe-filter-solution apps/whiskmate/src/app/recipe/recipe-filter.ng.ts
```

1. Run tests:

```sh
pnpm test
```

2. Implement tests:

   1. Spy on `filterChange` output. _(Note that an `EventEmitter` is an `Observable`)_

   2. Fill the form inputs using the following `aria-label` attributes: `Keywords`, `Max Ingredients` and `Max Steps`.

   3. Check that `filterChange` have been triggered.

3. Checkout the implementation as mentioned at step 0 if you didn't do it already.
