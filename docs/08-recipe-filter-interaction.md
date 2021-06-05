# Setup

```sh
git checkout origin/testing-12-recipe-filter

yarn
```

# 🎯 Goal: Test `<wm-recipe-search>` interaction with `<wm-recipe-filter>`

`<wm-recipe-filter>`'s `filterChange` output should trigger a new search with the given filter and refresh results.

We will test the contract using a shallow test.

# 📝 Steps

1. Run tests:

```sh
yarn test whiskmate --watch
```

2. Implement tests:

   1. Open `recipe-search.component.shallow.spec.ts`.

   2. Add new test.

   3. Mock `RecipeRepository.search`.

   4. Trigger `filterChange` on `<wm-recipe-filter>`. (Cf. [trigger events using `debugElement.triggerEventHandler`](#-tip-trigger-events-using-debugelementtriggereventhandler))

   5. Query DOM and check child recipe preview components properties. (Cf. [query DOM with `fixture.debugElement`](04-recipe-search-integration.md#-tip-query-dom-with-fixturedebugelement)] & [access element properties](05-recipe-search-shallow.md#-tip-access-element-properties))

   6. Check that `RecipeRepository.search` has been called with the right params.

3. 🙏🛑 wait until you finish implementing the tests before running: 🛑🙏

```sh
git checkout origin/testing-13-recipe-search-filter-interaction apps/whiskmate/src/app/recipe/recipe-search.component.ts
```

# Appendices

## 🎁 Tip: Trigger events using `DebugElement.triggerEventHandler`

You can trigger both native and custom events using `DebugElement.triggerEventHandler`.

```ts
fixture.query(...).triggerEventHandler('myEventName', myEvent);
```
