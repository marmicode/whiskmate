# Setup

```sh
git checkout origin/testing-400-recipe-filter-boilerplate
```

# 🎯 Goal: Test `<wm-recipe-filter>`

New component `<wm-recipe-filter>` should trigger `filterChange` output with a value of type `RecipeFilter`.

This will be later used by `<wm-recipe-search>` to filter results based on user filtering.

# 📝 Steps

0. [optional] you can either checkout the updated `RecipeFilterComponent` implementation first or go full-on TDD and implement the tests first.
```sh
git checkout origin/testing-401-recipe-filter apps/whiskmate/src/app/recipe/recipe-filter.component.ts
```

1. Run tests:

```sh
pnpm test --watch
```

2. Implement tests:

   1. Spy on `filterChange` output. _(Note that an `EventEmitter` is an `Observable`)_

   2. Form inputs have the following `data-role` attributes: `keywords-input`, `max-ingredient-count-input` and `max-step-count-input`.

   3. Check that `filterChange` have been triggered.

3. Checkout the implementation as mentioned at step 0 if you didn't do it already.
