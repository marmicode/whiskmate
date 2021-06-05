# Setup

```sh
git checkout origin/testing-00-boilerplate

yarn
```

# 🎯 Goal #1: Test `MealPlanner` service

`MealPlanner` is a stateful service that stores recipes that the user selects from a recipe catalog.

**Implement tests** for a class called `MealPlanner` with the following methods:

1. `addRecipe(recipe: Recipe)`: adds new recipes.
2. `getRecipes(): Recipe[]`: returns the list of recipes added.

## Business rules

1. `addRecipe` should throw an error if a recipe has already being added.

# 📝 Steps

1. Create `apps/whiskmate/src/app/meal/meal-planner.spec.ts` _(Cf. use [example below](#test-example))_
2. You can import `Recipe` from `apps/whiskmate/src/app/recipe/recipe.ts`

```ts
import { Recipe } from '../recipe/recipe';
```

3. Run tests:

```sh
yarn test whiskmate --watch
```

4. Implement tests.

# 🎯 Goal #2: Test `MealPlanner.canAddRecipe`

`canAddRecipe` tells if a recipe can be added to the meal planning or not.

**Implement tests** for the new method:

1. `canAddRecipe(recipe: Recipe): boolean`: returns true if recipe can be added and false otherwise.

## Business rules

1. Recipe can only be added if not already present. (i.e. recipes can't be added twice)

# 📝 Steps

1. Run tests:

```sh
yarn test whiskmate --watch
```

2. Implement tests.

3. 🙏🛑 wait until you finish implementing the tests before running: 🛑🙏

```sh
git checkout origin/testing-01-meal-planner apps/whiskmate/src/app/meal-planner/meal-planner.service.ts
```

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
    return new Calculator();
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
