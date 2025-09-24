## Setup

```sh
git checkout origin/testing-503-recipe-search-ct-starter
```

## 🎯 Goal #1: Check that `RecipeSearchComponent` shows all recipes

`RecipeSearchComponent` should show all recipes returned by `RecipeRepository`.

### 📝 Steps

1. Run tests:

```sh
pnpm nx component-test --watch
```

2. Open [`recipe-search.component.cy.ts`](../apps/whiskmate/src/app/recipe/recipe-search.component.cy.ts)

3. Arrange fake recipe repository with some recipes. _(Cf. [🎁 Tip: Arrange fakes before component is mounted](#-tip-arrange-fakes-before-component-is-mounted))_

4. Find all recipe names using `cy.findAllByRole()`.

5. Check that all recipe names are shown.

## 🎯 Goal #2: Check that `RecipeSearchComponent` filters recipes based on user criteria

`RecipeSearchComponent` should filter recipes based on user criteria.

### 📝 Steps

1. Set the `keywords` input value as we already did in [`recipe-filter.component.cy.ts`](../apps/whiskmate/src/app/recipe/recipe-filter.component.cy.ts).

2. Check that only recipes with matching keywords are shown.

## 🎯 Goal #3: Check that click "ADD" button adds the recipe to the meal plan

`RecipeSearchComponent` should add the recipe to the meal plan when "ADD" button is clicked.

### 📝 Steps

1. Find the "ADD" button using `cy.findByRole()`.

2. Click the "ADD" button.

3. Check that the recipe has been added to the meal plan. _(Cf. [🎁 Tip: Accessing a service](#-tip--accessing-a-service))_

## 🎯 Goal #4: Check that the "ADD" button is disabled when the recipe is already in the meal plan

`RecipeSearchComponent` should disable the "ADD" button when the recipe is already in the meal plan.

While we could simply click the "ADD" button and check that the button is disabled, we will instead check that the button is disabled from the start. The main reason to this is that we want to make sure that the button is disabled based on the meal plan and not just because the button was clicked.

2. Arrange fake meal repository by adding the recipe. _(Cf. [🎁 Tip: Arrange fakes before component is mounted](#-tip-arrange-fakes-before-component-is-mounted))_

3. Check that the "ADD" button is disabled.

## Appendices

### 🎁 Tip: Arrange fakes before component is mounted

In order to allow the test to arrange the fakes before the component is mounted, we can provide an `APP_INITIALIZER` and run our logic there.
You can use the `provideAppInitializer()` function to reduce the boilerplate.

```ts
it('should ...', () => {
   const { ... } = renderComponent(() => inject(MyFake).doSomething());
});

function renderComponent(configure?: () => void) {
  cy.mount(GreetingsComponent, {
    providers: [
      provideAppInitializer(() => {
          configure?.();
      })
    ]
  });
...
}
```

### 🎁 Tip: Accessing a service

We can access an Angular service in Cypress component testing using the `TestBed.inject()` static method just like we would do in Jest.

The only gotcha here is that we have to make this chainable and run it at the right moment (i.e. after the component has been mounted).

In order to help with that, we added a `cy.inject()` command in [`support/commands.ts`](../apps/whiskmate/cypress/support/commands.ts):

```ts
cy.inject(MyService).then((service) => {
  // ...
});
```
