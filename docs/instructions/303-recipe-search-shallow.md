---
sidebar_label: 303 - Recipe Search Shallow
---

# Recipe Search Shallow

## Setup

```sh
git switch testing-303-recipe-search-shallow-starter
```

## 🎯 Goal: Test `RecipeSearch`

Same goal as [previous exercise](302-recipe-search-integration.md) _(i.e. `RecipeSearch` should call `RecipeRepository.search()` on startup.)_

But let's check children properties this time.

**Implement tests** for `RecipeSearch` and make sure that:

1. recipes are passed to child components.

### 📝 Steps

0. [optional] you can either checkout the updated `RecipeSearch` implementation first or go full-on TDD and implement the tests first.

```sh
git checkout origin/testing-303-recipe-search-shallow-solution-test-bed apps/whiskmate/src/app/recipe/recipe-search.ng.ts
```

1. Run tests:

```sh
pnpm test
```

2. Implement tests:

   1. Override component's imports & schema:

   ```ts
   TestBed.overrideComponent(RecipeSearch, {
     set: {
       imports: [],
       schemas: [CUSTOM_ELEMENTS_SCHEMA],
     },
   });
   ```

   2. Query DOM and check child components properties. (Cf. [query DOM with `fixture.debugElement`](302-recipe-search-integration.md#-tip-query-dom-with-fixturedebugelement)] & [access element properties](#-tip-access-element-properties))

3. Checkout the implementation as mentioned at step 0 if you didn't do it already.

## Appendices

### 🎁 Tip: Access element properties

```ts
fixture.query(By.css('...')).properties;
```
