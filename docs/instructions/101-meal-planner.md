---
sidebar_label: 101 - Meal Planner
---

# Meal Planner

## Prerequisites

🚨 Did you set up `pnpm`? Are you on the right branch?

👉 [Initial Setup](./000-setup.md)

## Setup

```sh
pnpm cook start 101-meal-planner
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal #1: Test `MealPlanner` service

`MealPlanner` is a stateful service storing recipes that the user selects from a recipe catalog.

**Implement tests** for a class called `MealPlanner` with the following methods:

- `addRecipe(recipe: Recipe)`: adds new recipes.
- `getRecipes(): Recipe[]`: returns the list of recipes added.

### Business rules

- `addRecipe` should throw an error if a recipe has already being added.

### 📝 Steps

1. Go to `apps/whiskmate/src/app/meal-planner/meal-planner.spec.ts` _(Cf. use [example below](#test-example))_

2. You can import `Recipe` from `apps/whiskmate/src/app/recipe/recipe.ts`

```ts
import { Recipe } from '../recipe/recipe';
```

3. Run tests:

```sh
pnpm test
```

4. Implement tests.

5. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```

## 🎯 Goal #2: Test `MealPlanner.canAddRecipe`

`canAddRecipe` tells if a recipe can be added to the meal planning or not.

**Implement tests** for the new method:

- `canAddRecipe(recipe: Recipe): boolean`: returns true if recipe can be added and false otherwise.

### Business rules

- Recipe can only be added if not already present. _(i.e. recipes can't be added twice)_

### 📝 Steps

1. Run tests:

```sh
pnpm test
```

2. Implement tests.

## Appendices

### Vitest Matchers

- [https://vitest.dev/api/expect](https://vitest.dev/api/expect)

### Jest Matchers

- [https://jestjs.io/docs/expect](https://jestjs.io/docs/expect)

### Test Example

The example below tests the `Calculator.add` method. You can use it as a boilerplate.

```typescript
describe(Calculator.name, () => {
  it('should return sum', () => {
    const { calculator } = createCalculator();

    const result = calculator.add(1, 2);

    expect(result).toEqual(3);
  });

  function createCalculator() {
    return {
      calculator: new Calculator(),
    };
  }
});
```

### Check that a function throws

```ts
expect(() => myFunction()).toThrow('my error');
```
