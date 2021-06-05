# Setup

```sh
git checkout origin/testing-20-cypress-component-testing-boilerplate

yarn
```

# 🎯 Goal: Test `<wm-recipe-search>` using Cypress Component Testing & Harnesses

Thanks to [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction) _(Cypress >= 7)_ and [@jscutlery/cypress-angular](https://github.com/jscutlery/test-utils/tree/main/packages/cypress-angular), we can isolate a component or a block and test it in Cypress.

The fun part is that we can reuse our harnesses using [@jscutlery/cypress-harness](https://github.com/jscutlery/test-utils/tree/main/packages/cypress-harness).

Let's test `<wm-recipe-search>` in Cypress.

# 📝 Steps

0. [✅ Already done]

> ```sh
> ng add @jscutlery/cypress-angular # Also installs cypress.
>
> # Setup component testing for the apps or libs of your choice.
> ng g @jscutlery/cypress-angular:setup-ct whiskmate
>
> # Setup @jscutlery/cypress-harness
> yarn add -D  @jscutlery/cypress-harness cypress-pipe
> echo "import '@jscutlery/cypress-harness/support';" >> apps/whiskmate/cypress/support/index.ts
> ```

1. Run Cypress in component testing mode:

```sh
yarn ct
```

2. Open `recipe-search.cy-spec.ts`.

3. Have fun with the `RecipeSearchHarness` and implement the 3 tests.

# Appendices

## Cypress Assertions

- [https://docs.cypress.io/guides/references/assertions#Common-Assertions](https://docs.cypress.io/guides/references/assertions#Common-Assertions)

## [@jscutlery/cypress-harness](https://github.com/jscutlery/test-utils/tree/main/packages/cypress-harness) is chainable

```ts
harness.openCalendar().next();
```

## Chain with custom functions using `.then` or `.pipe`

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
