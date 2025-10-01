---
sidebar_label: 303 - Recipe Search Shallow
---

# Recipe Search Shallow

## Setup

```sh
pnpm cook start 303-recipe-search-shallow-test-bed
# or
pnpm cook start 303-recipe-search-shallow-testing-library
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Test `RecipeSearch`

Same goal as [previous exercise](302-recipe-search-integration.md) _(i.e. `RecipeSearch` should call `RecipeRepository.search()` on startup.)_

But let's check children properties this time.

**Implement tests** for `RecipeSearch` and make sure that:

1. recipes are passed to child components.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Implement tests:

1.  Override component's imports & schema:

```ts
TestBed.overrideComponent(RecipeSearch, {
  set: {
    imports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});
```

2.  Query DOM and check child components properties. (Cf. [query DOM with `fixture.debugElement`](302-recipe-search-integration.md#-tip-query-dom-with-fixturedebugelement)] & [access element properties](#-tip-access-element-properties))

#### 3. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```

## 📖 Appendices

### 🎁 Tip: Access element properties

```ts
fixture.query(By.css('...')).properties;
```
