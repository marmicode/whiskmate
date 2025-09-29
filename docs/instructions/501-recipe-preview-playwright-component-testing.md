---
sidebar_label: 501 - Playwright CT - Recipe Preview
---

# Recipe Preview Playwright Component Testing

## Setup

```sh
pnpm cook start 501-recipe-preview-ct
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Test `RecipePreview` using Playwright Component Testing

Thanks to [Playwright Component Testing](https://playwright.dev/docs/test-components), we can isolate a component or a block and test it in Playwright.

Let's test that `RecipePreview` is showing the recipe name properly.

### 📝 Steps

1. Run Playwright component tests:

```sh
pnpm test-ui --ui
```

2. Open `src/app/recipe/recipe-preview.pw.ts`.

3. `RecipePreview` needs a `recipe` input. You can create a recipe using the `recipeMother` object mother and passing along to the component using the `inputs` option. e.g.:

```ts
const component = mount(Greetings, {
  inputs: {
    name: 'Foo',
  },
});
```

4. Check that the recipe name is shown.

Playwright provides built-in locators similar to Testing Library. Cf. [https://playwright.dev/docs/locators](https://playwright.dev/docs/locators)

## Appendices

### Playwright Assertions

- [https://playwright.dev/docs/test-assertions](https://playwright.dev/docs/test-assertions)
