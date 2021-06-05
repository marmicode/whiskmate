# Setup

```sh
git checkout origin/testing-08-recipe-search-shallow-boilerplate

yarn
```

# 🎯 Goal: Test `<wm-recipe-search>`

Same goal as [previous exercise](04-recipe-search-integration.md) _(i.e. `<wm-recipe-search>` should call `RecipeRepository.search()` on startup.)_

But let's check children properties this time.

**Implement tests** for `<wm-recipe-search>` and make sure that:

1. recipes are passed to child components.

# 📝 Steps

1. Run tests:

```sh
yarn test whiskmate --watch
```

2. Implement tests:

   1. Declare component using:

   ```ts
   TestBed.configureTestingModule({
     declarations: [MyComponent],
     schemas: [CUSTOM_ELEMENTS_SCHEMA],
   });
   ```

   2. Mock `RecipeRepository.search` _(Cf. [mock provider](03-recipe-search-isolated.md#-tip-mock-provider) & [type safety](03-recipe-search-isolated.md#-tip-class-type-safety-) & [mock function returning observable](03-recipe-search-isolated.md#-tip-mock-a-function-returning-an-observable))_.

   3. Trigger change detection by calling `fixture.detectChanges()`.

   4. Query DOM and check child components properties. (Cf. [query DOM with `fixture.debugElement`](04-recipe-search-integration.md#-tip-query-dom-with-fixturedebugelement)] & [access element properties](#-tip-access-element-properties))

   5. Check mock was called properly.

# Appendices

## 🎁 Tip: Access element properties

```ts
fixture.query(By.css('...')).properties;
```
