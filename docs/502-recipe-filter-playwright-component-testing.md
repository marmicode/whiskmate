# Setup

```sh
git checkout origin/testing-502-recipe-filter-ct-starter
```

# 🎯 Goal: Test `RecipeFilterComponent` using Playwright Component Testing

Check that `RecipeFilterComponent` triggers the `filterChange` output with the right value when the user interacts with the form.

## 📝 Steps

1. Run Playwright component tesets:

```sh
pnpm nx test-ui --ui
```

2. Open [`recipe-filter.component.pw.ts`](../apps/whiskmate/src/app/recipe/recipe-filter.component.pw.ts).

3. Fill the form by finding the inputs with their labels _(Keywords, Max Ingredients, Max Steps)_ then type using the `type()` command.
```ts
component.getByLabel('Keywords').fill('...');
```

4. Spy on the `filterChange` output _(Cf. [🎁 Tip: Spying on component outputs](#-tip--spying-on-component-outputs))_ and check that it was called with the right filter object.

# Appendices

## 🎁 Tip: Spying on component outputs

```ts
const component = mount({
  spyOutputs: ['filterChange']
})

expect(component.spies.filterChange).toHave...;
```