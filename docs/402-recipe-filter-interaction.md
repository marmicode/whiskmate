# Setup

```sh
git switch testing-402-recipe-search-filter-interaction-starter
```

# 🎯 Goal: Test `RecipeSearch` interaction with `RecipeFilter`

`RecipeFilter`'s `filterChange` output should trigger a new search with the given filter and refresh results.

We will test the contract using a shallow test.

## 📝 Steps

0. [optional] you can either checkout the updated `RecipeSearch` implementation first or go full-on TDD and implement the tests first.

```sh
git checkout origin/testing-402-recipe-search-filter-interaction-solution apps/whiskmate/src/app/recipe/recipe-search.ng.ts
```

1. Run tests:

```sh
pnpm test
```

2. Implement tests:

   1. Open [`recipe-search.ng.shallow.spec.ts`](../apps/whiskmate/src/app/recipe/recipe-search.ng.shallow.spec.ts).

   2. Add a new test: `it('should search recipes using given filter', ...)`.

   3. Trigger `filterChange` on `RecipeFilter`. (Cf. [trigger events using `debugElement.triggerEventHandler`](#-tip-trigger-events-using-debugelementtriggereventhandler))

   4. Query DOM and check child recipe preview components properties. (Cf. [query DOM with `fixture.debugElement`](04-recipe-search-integration.md#-tip-query-dom-with-fixturedebugelement)] & [access element properties](05-recipe-search-shallow.md#-tip-access-element-properties))

3. Checkout the implementation as mentioned at step 0 if you didn't do it already.

# Appendices

## 🎁 Tip: Trigger events using `DebugElement.triggerEventHandler`

You can trigger both native and custom events using `DebugElement.triggerEventHandler`.

```ts
fixture.query(...).triggerEventHandler('myEventName', myEvent);
```
