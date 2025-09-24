## Setup

```sh
git checkout origin/testing-705-ct-harness-starter
```

## 🎯 Goal: Test `RecipeSearchComponent` using Cypress Component Testing & Harnesses

Thanks to [@jscutlery/cypress-harness](https://github.com/jscutlery/devkit/tree/main/packages/cypress-harness)

Let's clean up our `RecipeSearchComponent` tests from DOM logic and use the `RecipeSearchHarness` as an abstraction instead.

### 📝 Steps

0. [✅ Already done] Set up Cypress Harness

```sh
nx g @nx/angular:cypress-component-configuration whiskmate

## Setup @jscutlery/cypress-harness
pnpm install -D  @jscutlery/cypress-harness cypress-pipe
echo "import '@jscutlery/cypress-harness/support-ct';" >> apps/whiskmate/cypress/support/commands.ts
```

1. Run Cypress in component testing mode:

```sh
pnpm ct --watch
```

2. Refactor [`recipe-filter.component.cy.ts`](../apps/whiskmate/src/app/recipe/recipe-filter.component.cy.ts) and get rid of all calls to `cy.find*()`.
3. Refactor [`recipe-preview.component.cy.ts`](../apps/whiskmate/src/app/recipe/recipe-preview.component.cy.ts) and get rid of all calls to `cy.find*()`.
4. Refactor [`recipe-search.component.cy.ts`](../apps/whiskmate/src/app/recipe/recipe-search.component.cy.ts) and get rid of all calls to `cy.find*()`.

## Appendices

### [@jscutlery/cypress-harness](https://github.com/jscutlery/test-utils/tree/main/packages/cypress-harness) is chainable

```ts
harness.openCalendar().next();
```

### Chain with custom functions using `.then` or `.pipe`

- Use `then` if you want the action to happen once. (e.g. click action)

```ts
harness.then((h) => h.click());
```

- Use `pipe` if the function is stateless as it will be retried until the assertions succeeds or the test times out.

```ts
harness
  .getSomeValue()
  .pipe((value) => value.split(',')[0])
  .should('equal', 'test');
```
