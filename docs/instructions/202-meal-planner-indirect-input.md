---
sidebar_label: 202 - Meal Planner Indirect Input
---

# Meal Planner Indirect Input

## Setup

```sh
pnpm cook start 202-meal-planner-indirect-input
# ♻️ TDD: You can choose to:
# - go full-on TDD and implement the tests first then checkout the implementation later,
# - or checkout the implementation first and then implement the tests.
```

## 🎯 Goal: Sync meals from the `MealRepository` to the `MealPlanner`

On startup, the `MealPlanner` should fetch meals from the `MealRepository`.

### 📝 Steps with a Fake

1. Run tests:

```sh
pnpm test
```

2. Use the `setUpMealPlanner()` function instead of `createMealPlanner()` in order to configure the spy before creating the `MealPlanner`.

3. Check that the `MealPlanner` contains the meals from the `MealRepository`.

4. Checkout the implementation as mentioned at step 0 if you didn't do it already.

### 📝 Steps with a Spy

1. Run tests:

```sh
pnpm test
```

2. Remove the fake and create & provide the spy instead. _(Cf. [Tip: Create & provide a type-safe spy](./201-meal-planner-indirect-output.md#-tip-create--provide-a-type-safe-spy-with-vitest))_

3. Use the `setUpMealPlanner()` function instead of `createMealPlanner()` in order to configure the spy before creating the `MealPlanner`.

4. Check that the `MealPlanner` contains the meals from the `MealRepository`.

5. Check that the spy was called properly.

6. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```
