---
sidebar_label: 301 - Recipe Search Isolated
---

# Recipe Search Isolated

## Setup

```sh
pnpm cook start 301-recipe-search-isolated
# ♻️ TDD: You can choose to:
# - go full-on TDD and implement the tests first then checkout the implementation later,
# - or checkout the implementation first and then implement the tests.
```

## 🎯 Goal: Test `RecipeSearch`

New component `RecipeSearch` should call `RecipeRepository.search()` on startup.

**Implement tests** for `RecipeSearch` and make sure that:

1. `recipes` property is set with the recipes returned by `RecipeRepository`.

```ts
export class RecipeSearch {
  recipes: Recipe[];
}
```

### 📝 Steps

1. Run tests:

```sh
pnpm test
```

2. Implement tests:

   1. Check `RecipeSearch.recipes`.

   2. Provide a fake `RecipeRepository` and initialize it with some recipes using the `recipeMother` _(`src/app/testing/recipe.mother.ts`)_ Object Mother.

   ```ts
   TestBed.configureTestingModule({
     providers: [provideRecipeRepositoryFake()],
   });

   TestBed.inject(RecipeRepositoryFake).setRecipes([
     recipeMother.withBasicInfo('Burger').build(),
     ...
   ]);
   ```

3. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```
