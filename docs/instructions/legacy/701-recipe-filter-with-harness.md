## Setup

```sh
git checkout origin/testing-700-recipe-filter-material-harness-starter
```

## 🎯 Goal: Test `<wm-recipe-filter>` using `MatInputHarness`

Update `src/app/recipe/recipe-filter.component.spec.ts` using `MatInputHarness`.

### 📝 Steps

1. Run tests:

```sh
pnpm test
```

2. Implement tests:

   1. Open `src/app/recipe/recipe-filter.component.spec.ts`.

   2. Instantiate a `HarnessLoader`:

   ```ts
   const loader = TestbedHarnessEnvironment.loader(fixture);
   ```

   3. Query inputs using `HarnessLoader.getHarness` & `MatInputHarness.with({selector})` predicate.

   4. Have fun with the harness.

   5. Don't forget to wait for promises to resolve 😉.
