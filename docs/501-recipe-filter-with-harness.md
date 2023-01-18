# Setup

```sh
git checkout origin/testing-500-recipe-filter-material-harness-boilerplate

yarn
```

# 🎯 Goal: Test `<wm-recipe-filter>` using `MatInputHarness`

Update [`recipe-filter.component.spec.ts`](../apps/whiskmate/src/app/recipe/recipe-filter.component.spec.ts) using `MatInputHarness`.

# 📝 Steps

1. Run tests:

```sh
yarn test --watch
```

2. Implement tests:

   1. Open [`recipe-filter.component.spec.ts`](../apps/whiskmate/src/app/recipe/recipe-filter.component.spec.ts).

   2. Instantiate a `HarnessLoader`:

   ```ts
   const loader = TestbedHarnessEnvironment.loader(fixture);
   ```

   3. Query inputs using `HarnessLoader.getHarness` & `MatInputHarness.with({selector})` predicate.

   4. Have fun with the harness.

   5. You can remove `fixture.detectChanges()` as harnesses trigger change detection under the hood.

   6. Don't forget to wait for promises to resolve 😉.