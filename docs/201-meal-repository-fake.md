# Setup

```sh
git checkout origin/testing-200-meal-repository-fake-boilerplate

yarn
```

# 🎯 Goal: Make sure that meals are persisted

Persisting the recipes added to the meal planning will require the `MealPlanner` to use a `MealRepository` service.
We don't know yet how the `MealRepository` will be implemented, but we know how we want to use it.

In order to test that the `MealPlanner` is adding the meals in the correct way, we will need a test double for the `MealRepository`.

You can use a [Spy](#-steps-with-a-spy), a [Fake](#-steps-with-a-fake), or try both if you have enough time.

# 📝 Steps with a Spy

0. [optional] you can either checkout the updated `MealPlanner` implementation first or go full-on TDD and implement the tests first.
```sh
git checkout origin/testing-201-meal-repository-fake apps/whiskmate/src/app/meal-planner/meal-planner.service.ts
```

1. Run tests:

```sh
yarn test --watch
```

2. Add test: `it('should add recipe to meal repository', ...)`

3. Create & provide the spy. _(Cf. [Tip: Create & provide a type-safe spy](#-tip--create--provide-a-type-safe-spy))_

4. Add a recipe using `mealPlanner.addRecipe(...)`.

5. Check that the spies were called properly.

6. Checkout the implementation as mentioned at step 0 if you didn't do it already.

# 📝 Steps with a Fake

0. [optional] you can either checkout the updated `MealPlanner` implementation first or go full-on TDD and implement the tests first.
```sh
git checkout origin/testing-201-meal-repository-fake apps/whiskmate/src/app/meal-planner/meal-planner.service.ts
```

1. Run tests:

```sh
yarn test --watch
```

2. Add test: `it('should add recipe to meal repository', ...)`

3. Implement the fake in [`meal-repository.fake.ts`](../apps/whiskmate/src/app/meal-planner/meal-repository.fake.ts) & provide it _(Cf. [Tip: Provide a fake](#-tip--provide-a-fake))_.

4. Add a recipe using `mealPlanner.addRecipe(...)`.

5. Check that the fake repo contains the added recipe.

6. Checkout the implementation as mentioned at step 0 if you didn't do it already.

# Appendices

## 🎁 Tip: Provide a fake

### a. by instantiating the fake manually
```ts
const myRepoFake = new MyRepoFake();

TestBed.configureTestingModule({
  providers: [
    { provide: MyRepo, useValue: myRepoFake }
  ]
});
```

### b. by using providers _(useful if the fake has dependencies which is not common though)_
```ts
TestBed.configureTestingModule({
  providers: [
    MyRepoFake,
    { provide: MyRepo, useExisting: MyRepoFake }
  ]
});

const myRepoFake = TestBed.inject(MyRepoFake);
```
