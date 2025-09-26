---
sidebar_label: 401 - Recipe Filter
---

# Recipe Filter

## Setup

```sh
pnpm cook start 401-recipe-filter
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Test `RecipeFilter`

New component `RecipeFilter` should trigger `filterChange` output with a value of type `RecipeFilterCriteria`.

This will be later used by `RecipeSearch` to filter results based on user filtering.

### 📝 Steps

1. Run tests:

```sh
pnpm test
```

2. Implement tests:

   1. Spy on `filterChange` output. _(Note that an `EventEmitter` is an `Observable`)_

   2. Fill the form inputs using the following `aria-label` attributes: `Keywords`, `Max Ingredients` and `Max Steps`.

   3. Check that `filterChange` have been triggered.

3. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```
