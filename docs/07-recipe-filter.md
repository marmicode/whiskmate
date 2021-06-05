# Setup

```sh
git checkout origin/testing-11-recipe-filter-boilerplate

yarn
```

# 🎯 Goal: Test `<wm-recipe-filter>`

New component `<wm-recipe-filter>` should trigger `filterChange` output with a value of type `RecipeFilter`.

This will be later used by `<wm-recipe-search>` to filter results based on user filtering.

# 📝 Steps

1. Run tests:

```sh
yarn test whiskmate --watch
```

2. Implement tests:

   1. Spy on `filterChange` output. _(Note that an `EventEmitter` is an `Observable`)_

   2. Form inputs have the following `data-role` attributes: `keywords-input`, `max-ingredient-count-input` and `max-step-count-input`.

   3. Check that `filterChange` have been triggered.

   4. Did you think about triggering change detection?

3. 🙏🛑 wait until you finish implementing the tests before running: 🛑🙏

```sh
git checkout origin/testing-12-recipe-filter apps/whiskmate/src/app/recipe/recipe-filter.component.ts
```
