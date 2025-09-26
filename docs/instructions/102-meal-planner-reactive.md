---
sidebar_label: 102 - Meal Planner Reactive
---

# Meal Planner Reactive

## Setup

```sh
pnpm cook start 102-meal-planner-reactive
# ♻️ TDD: You can choose to:
# - go full-on TDD and implement the tests first then checkout the implementation later,
# - or checkout the implementation first and then implement the tests.
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

3. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```

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
