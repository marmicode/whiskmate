# Setup

```sh
git checkout origin/testing-100-meal-planner-boilerplate

yarn
```

# 🎯 Goal #1: Test `MealPlanner` service

`MealPlanner` is a stateful service storing recipes that the user selects from a recipe catalog.

**Implement tests** for a class called `MealPlanner` with the following methods:

1. `addRecipe(recipe: Recipe)`: adds new recipes.
2. `getRecipes(): Recipe[]`: returns the list of recipes added.

## Business rules

1. `addRecipe` should throw an error if a recipe has already being added.

# 📝 Steps

0. [optional] you can either checkout the `MealPlanner` implementation first or go full-on TDD and implement the tests first.
```sh
git checkout origin/testing-101-meal-planner apps/whiskmate/src/app/meal-planner/meal-planner.service.ts
```

1. Go to [`apps/whiskmate/src/app/meal-planner/meal-planner.service.spec.ts`](../apps/whiskmate/src/app/meal-planner/meal-planner.service.spec.ts) _(Cf. use [example below](#test-example))_
2. 
3. You can import `Recipe` from `apps/whiskmate/src/app/recipe/recipe.ts`

```ts
import { Recipe } from '../recipe/recipe';
```

3. Run tests:

```sh
yarn test --watch
```

4. Implement tests.

5. Checkout the implementation as mentioned at step 0 if you didn't do it already.

# 🎯 Goal #2: Test `MealPlanner.canAddRecipe`

`canAddRecipe` tells if a recipe can be added to the meal planning or not.

**Implement tests** for the new method:

1. `canAddRecipe(recipe: Recipe): boolean`: returns true if recipe can be added and false otherwise.

## Business rules

1. Recipe can only be added if not already present. _(i.e. recipes can't be added twice)_

# 📝 Steps

1. Run tests:

```sh
yarn test --watch
```

2. Implement tests.

# Appendices

## Jest Matchers

- [https://jestjs.io/docs/expect](https://jestjs.io/docs/expect)

## Test Example

The example below tests the `Calculator.add` method. You can use it as a boilerplate.

```typescript
describe(Calculator.name, () => {
  it('should return sum', () => {
    const result = createCalculator().add(1, 2);

    expect(result).toEqual(3);
  });

  function createCalculator() {
    return {
      calculator: new Calculator(),
    };
  }
});
```

## Nested describe

You can group tests with a nested describe and setup something common but don't use it too much as it can affect readability, maintainability, thus the cost.

```ts
describe(Shop.name, () => {
  describe('when closed', () => {
    beforeEach(() => shop.close());

    it.todo('should throw error on open');

    it.todo('should close');
  });
});
```

## Check that a function throws

```ts
expect(() => myFunction()).toThrow('my error');
```