# Setup

```sh
git checkout origin/testing-16-recipe-filter-material-harness

yarn
```

# 🎯 Goal: Create and use `RecipeFilterHarness`

Create a harness that abstracts interactions with `<wm-recipe-filter>`.

Update `recipe-filter.component.spec.ts` in order to use the `RecipeFilterHarness`.

# 📝 Steps

1. Run tests:

```sh
yarn test whiskmate --watch
```

2. Create harness:

   1. Create `RecipeFilterHarness` in `recipe-filter.harness.ts`.

   2. Extend `ComponentHarness`.

   3. Don't forget the `hostSelector` **static** property. It's the one that tells how we can find the component.

   4. Implement a `setValue(filter: RecipeFilter)` method.

   5. Use `ComponentHarness.locatorFor` to locate any element or component using a harness. (Cf. [use `locatorFor`](#-tip-use-locatorfor))

3. Update test:

   1. Open `recipe-filter.component.spec.ts`.

   2. It's different this time, we get the harness directly without the loader indirection.
      The tested component is injected dynamically by `TestBed` and doesn't have the right selector.
      This is one of the reasons why we need to use the special static method `harnessForFixture` when we need a harness for the tested component.

   ```ts
   const harness = await TestbedHarnessEnvironment.harnessForFixture(
     fixture,
     RecipeFilterHarness
   );
   ```

   3. Have fun with the harness!

   4. Don't forget to wait for promises to resolve 😉.

# Appendices

## 🎁 Tip: Use `locatorFor`

```ts
const getItem = this.locatorFor('.item');
(await getItem()).click();

const getCalendar = this.locatorFor(MatCalendarHarness);
(await getCalendar()).openCalendar();
```
