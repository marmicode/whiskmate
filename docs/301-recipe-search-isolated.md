# Setup

```sh
git switch testing-301-recipe-search-isolated-starter
```

# 🎯 Goal: Test `RecipeSearch`

New component `RecipeSearch` should call `RecipeRepository.search()` on startup.

**Implement tests** for `RecipeSearch` and make sure that:

1. `recipes` property is set with the recipes returned by `RecipeRepository`.

```ts
export class RecipeSearch {
  recipes: Recipe[];
}
```

## 📝 Steps

0. [optional] you can either checkout the updated `RecipeSearch` implementation first or go full-on TDD and implement the tests first.

```sh
git checkout origin/testing-301-recipe-search-isolated-solution apps/whiskmate/src/app/recipe/recipe-search.ng.ts
```

1. Run tests:

```sh
pnpm test
```

2. Implement tests:

   1. Check `RecipeSearch.recipes`.

   2. Provide a fake `RecipeRepository` and initialize it with some recipes using the [`recipeMother`](../apps/whiskmate/src/app/testing/recipe.mother.ts) Object Mother.

   ```ts
   TestBed.configureTestingModule({
     providers: [provideRecipeRepositoryFake()],
   });

   TestBed.inject(RecipeRepositoryFake).setRecipes([
     recipeMother.withBasicInfo('Burger').build(),
     ...
   ]);
   ```

3. Checkout the implementation as mentioned at step 0 if you didn't do it already.
