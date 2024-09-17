# Setup

```sh
git checkout origin/testing-301-recipe-search-isolated-starter
```

# 🎯 Goal: Test `<wm-recipe-search>`

New component `<wm-recipe-search>` should call `RecipeRepository.search()` on startup.

**Implement tests** for `<wm-recipe-search>` and make sure that:

1. `recipes` property is set with the recipes returned by `RecipeRepository`.

```ts
export class RecipeSearchComponent {
  recipes: Recipe[];
}
```

## 📝 Steps

0. [optional] you can either checkout the updated `RecipeSearchComponent` implementation first or go full-on TDD and implement the tests first.
```sh
git checkout origin/testing-301-recipe-search-isolated-solution apps/whiskmate/src/app/recipe/recipe-search.component.ts
```

1. Run tests:

```sh
pnpm test
```

2. Implement tests:

   1. Check `RecipeSearchComponent.recipes`.

   2. Provide a fake `RecipeRepository` and initialize it with some recipes using the `RecipeMother` Object Mother.
   ```ts
   const fakeRepo = new RecipeRepositoryFake();
   
   fakeRepo.setRecipes([recipeMother.withBasicInfo('Burger').build(), ...]);
   
   TestBed.configureTestingModule({
     providers: [
       { provide: RecipeRepository, useValue: fakeRepo },
     ],
   });
   ```

3. Checkout the implementation as mentioned at step 0 if you didn't do it already.
