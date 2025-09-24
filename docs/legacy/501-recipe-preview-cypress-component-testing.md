## Setup

```sh
git switch testing-501-recipe-preview-ct-starter
```

## 🎯 Goal: Test `RecipePreviewComponent` using Cypress Component Testing

Thanks to [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction), we can isolate a component or a block and test it in Cypress.

Let's test that `RecipePreviewComponent` is showing the recipe name properly.

### 📝 Steps

1. Run Cypress component tests:

```sh
pnpm nx component-test --watch
```

2. Open [`recipe-preview.component.cy.ts`](../apps/whiskmate/src/app/recipe/recipe-preview.component.cy.ts).

3. `RecipePreviewComponent` needs a `recipe` input. You can create a recipe using the `recipeMother` object mother and passing along to the component using the `componentProperties` option. e.g.:

```ts
cy.mount(GreetingsComponent, {
  componentProperties: {
    name: 'Foo',
  },
});
```

4. Check that the recipe name is shown.

There are different ways to achieve this. We can use the `cy.get()` command to find the right element and check its text but the selector would be coupled to the implementation details.

Instead, we can use the `cy.contains()` command which is more resilient to changes in the DOM but it isn't as precise as `cy.get()`.

One of the most resilient and robust alternatives is using [`@testing-library/cypress`](https://github.com/testing-library/cypress-testing-library) which provides a set of helpful commands _(Cf. https://testing-library.com/docs/queries/about/#priority)_.

Note that `@testing-library/cypress` is already set up. _Cf. [apps/whiskmate/cypress/support/commands.ts](../apps/whiskmate/cypress/support/commands.ts)._

## Appendices

### Cypress Assertions

- [https://docs.cypress.io/guides/references/assertions#Common-Assertions](https://docs.cypress.io/guides/references/assertions#Common-Assertions)

### Testing Library Queries & Priority

- [https://testing-library.com/docs/queries/about/#priority](https://testing-library.com/docs/queries/about/#priority)
