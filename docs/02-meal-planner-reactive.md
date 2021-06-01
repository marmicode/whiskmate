# Setup

```sh
git checkout testing-01-meal-planner

yarn
```

# 🎯 Goal #1: Test `MealPlanner.recipes$`

It's time to get reactive!

Instead of letting Angular poll recipes using `MealPlanner.getRecipes()`, we will subscribe to the `recipes$` property:

```ts
class MealPlanner {
  recipes$: Observable<Recipe[]>;
}
```

**Implement tests** for `recipes$` and make sure that:

1. it notifies subscribers when new recipes are added.

# 📝 Steps

1. Run tests:

```sh
yarn test whiskmate --watch
```

2. Implement tests.

# 🎯 Goal #2: Test `MealPlanner.watchCanAddRecipe()`

Instead of letting Angular poll recipes using `MealPlanner.canAddRecipe(recipe: Recipe)`, we will implement a reactive alternative:

```ts
class MealPlanner {
  watchCanAddRecipe(recipe: Recipe): Observable<boolaen>;
}
```

**Implement tests** for `watchCanAddRecipe` and make sure that:

1. it notifies subscribers when new recipes are added.

# 📝 Steps

1. Run tests:

```sh
yarn test whiskmate --watch
```

2. Implement tests.

3. 🙏🛑 wait until you finish implementing the tests before running: 🛑🙏

```sh
git checkout testing-02-meal-planner-reactive apps/whiskmate/src/app/meal-planner/meal-planner.service.ts
```

# Appendices

## 🎁 Tip: Spying on observables

```ts
const observer = jest.fn();

source$.subscribe(observer);

expect(observer).toBeCalledTimes(1);
expect(observer).toBeCalledWith('🍔');
```
