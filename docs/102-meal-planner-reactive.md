---
sidebar_label: 102 - Meal Planner Reactive
---

# Meal Planner Reactive

## Setup

```sh
git switch testing-102-meal-planner-reactive-starter
```

## 🎯 Goal #1: Test `MealPlanner.recipes$`

It's time to get reactive!

Instead of letting Angular poll recipes using `MealPlanner.getRecipes()`, we will subscribe to the `recipes$` property:

```ts
class MealPlanner {
  recipes$: Observable<Recipe[]>;
}
```

**Implement tests** for `recipes$` and make sure that:

1. it notifies subscribers when new recipes are added.

### 📝 Steps

0. [optional] you can either checkout the updated `MealPlanner` implementation first or go full-on TDD and implement the tests first.

```sh
git checkout origin/testing-102-meal-planner-reactive-solution apps/whiskmate/src/app/meal-planner/meal-planner.ts
```

1. Run tests:

```sh
pnpm test
```

2. Implement tests.

## 🎯 Goal #2: Test `MealPlanner.watchCanAddRecipe()`

Instead of letting Angular poll recipes using `MealPlanner.canAddRecipe(recipe: Recipe)`, we will implement a reactive alternative:

```ts
class MealPlanner {
  watchCanAddRecipe(recipe: Recipe): Observable<boolaen>;
}
```

**Implement tests** for `watchCanAddRecipe` and make sure that:

1. it notifies subscribers when new recipes are added.

### 📝 Steps

1. Run tests:

```sh
pnpm test
```

2. Implement tests.

3. Checkout the implementation as mentioned at step 0 if you didn't do it already.

## Appendices

### 🎁 Tip: Spying on observables

#### with our cross-test-runner `observe` function

```ts
import { observe } from '../../testing/observe';

using observer = observe(source$);

expect(observer.next).toHaveBeenCalledTimes(1);
expect(observer.next).toHaveBeenCalledWith('🍔');
```

#### with Vitest

```ts
const observer = vi.fn();

source$.subscribe(observer);

expect(observer).toHaveBeenCalledExactlyOnceWith('🍔');
```

#### with Jest

```ts
const observer = jest.fn();

source$.subscribe(observer);

expect(observer).toHaveBeenCalledTimes(1);
expect(observer).toHaveBeenCalledWith('🍔');
```
