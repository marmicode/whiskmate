---
sidebar_label: 301 - Recipe Search Isolated
---

# Recipe Search Isolated

## Setup

```sh
pnpm cook start 301-recipe-search-isolated
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Test `RecipeSearch`

New component `RecipeSearch` should fetch recipes using `RecipeRepository` on startup.

**Implement tests** for `RecipeSearch` and make sure that:

1. `recipes` property is set with the recipes returned by `RecipeRepository`.

```ts
export class RecipeSearch {
  recipes: Recipe[];
}
```

:::info
You can try the same exercise with both:

- the real server (Cf. [2.a. Configure the `TestBed` with real server](#2a-configure-the-testbed-with-real-server))
- then with the fake repository (Cf. [2.b. Configure the `TestBed` with a test double](#2b-configure-the-testbed-with-a-test-double))
  :::

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.ng.isolated.spec.ts`.

#### 3.a. Configure the `TestBed` with real server:

```ts
TestBed.configureTestingModule({ providers: [provideHttpClient()] });
```

#### 3.b. Configure the `TestBed` with a test double:

```ts
TestBed.configureTestingModule({ providers: [provideRecipeRepositoryFake()] });
const fake = TestBed.inject(RecipeRepositoryFake);

/* Configure the fake. */
fake...
```

#### 4. Check `component.recipes` property.

#### 5. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```

## 📖 Appendices

### 🎁 Tip: polling until success with `expect.poll`

```ts
await expect.poll(() => getSomething()).toBe(42);
```
