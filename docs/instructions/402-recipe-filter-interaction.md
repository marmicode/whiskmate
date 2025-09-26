---
sidebar_label: 402 - Recipe Filter Interaction
---

# Recipe Filter Interaction

## Setup

```sh
pnpm cook start 402-recipe-search-filter-interaction
# ♻️ TDD: You can choose to:
# - go full-on TDD and implement the tests first then checkout the implementation later,
# - or checkout the implementation first and then implement the tests.
```

## 🎯 Goal: Test `RecipeSearch` interaction with `RecipeFilter`

`RecipeFilter`'s `filterChange` output should trigger a new search with the given filter and refresh results.

We will test the contract using a shallow test.

### 📝 Steps

1. Run tests:

```sh
pnpm test
```

2. Implement tests:

   1. Open `apps/whiskmate/src/app/recipe/recipe-search.ng.shallow.spec.ts`.

   2. Add a new test: `it('should search recipes using given filter', ...)`.

   3. Trigger `filterChange` on `RecipeFilter`. (Cf. [trigger events using `debugElement.triggerEventHandler`](#-tip-trigger-events-using-debugelementtriggereventhandler))

   4. Query DOM and check child recipe preview components properties. (Cf. [query DOM with `fixture.debugElement`](./302-recipe-search-integration.md#-tip-query-dom-with-fixturedebugelement)] & [access element properties](./303-recipe-search-shallow.md#-tip-access-element-properties))

3. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```

## Appendices

### 🎁 Tip: Trigger events using `DebugElement.triggerEventHandler`

You can trigger both native and custom events using `DebugElement.triggerEventHandler`.

```ts
fixture.query(...).triggerEventHandler('myEventName', myEvent);
```
