---
sidebar_label: 201 - Meal Planner Indirect Output
---

# Meal Planner Indirect Output

## Setup

```sh
pnpm cook start 201-meal-planner-indirect-output
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Make sure that meals are persisted

Persisting the recipes added to the meal planning will require the `MealPlanner` to use a `MealRepository` service.
We don't know yet how the `MealRepository` will be implemented, but we know how we want to use it.

In order to test that the `MealPlanner` is adding the meals in the correct way, we will need a test double for the `MealRepository`.

You can use a [Spy](#-steps-with-a-spy), a [Fake](#-steps-with-a-fake), or try both if you have enough time.

### 📝 Steps with a Fake

1. Run tests:

```sh
pnpm test
```

2. Implement the fake in `src/app/meal-planner/meal-repository.fake.ts` & provide it _(Cf. [Tip: Provide a fake](#-tip-provide-a-fake))_.

3. Add a recipe using `mealPlanner.addRecipe(...)`.

4. Check that the fake repo contains the added recipe.

5. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```

### 📝 Steps with a Spy

1. Run tests:

```sh
pnpm test
```

2. Create & provide the spy. _(Cf. [Tip: Create & provide a type-safe spy](#-tip-create--provide-a-type-safe-spy-with-vitest))_

3. Add a recipe using `mealPlanner.addRecipe(...)`.

4. Check that the spies were called properly.

5. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```

## Appendices

### 🎁 Tip: Provide a fake

```ts
TestBed.configureTestingModule({
  providers: [MyRepoFake, { provide: MyRepo, useExisting: MyRepoFake }],
});

const myRepoFake = TestBed.inject(MyRepoFake);
```

### 🎁 Tip: Create & provide a type-safe spy with Vitest

```ts
import { type Mocked } from 'vitest';

const myRepoSpy: Mocked<MyRepoDef> = {
  /* Do not stub the returned value or implementation here
   * as it won't be type-safe... */
  getItems: vi.fn(),
};

/* ... do it here instead so it's type-safe. */
myRepoSpy.getItems.mockReturnValue(of([]));

TestBed.configureTestingModule({
  providers: [{ provide: MyRepo, useValue: myRepoSpy }],
});
```

### 🎁 Tip: Create & provide a type-safe spy with Jest

```ts
const myRepoSpy: jest.Mocked<MyRepoDef> = {
  /* Do not stub the returned value or implementation here
   * as it won't be type-safe... */
  getItems: jest.fn(),
};

/* ... do it here instead so it's type-safe. */
myRepoSpy.getItems.mockReturnValue(of([]));

TestBed.configureTestingModule({
  providers: [{ provide: MyRepo, useValue: myRepoSpy }],
});
```
