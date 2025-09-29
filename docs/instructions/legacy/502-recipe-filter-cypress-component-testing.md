## Setup

```sh
git checkout origin/testing-502-recipe-filter-ct-starter
```

## 🎯 Goal: Test `RecipeFilterComponent` using Cypress Component Testing

Check that `RecipeFilterComponent` triggers the `filterChange` output with the right value when the user interacts with the form.

### 📝 Steps

1. Run Cypress component tests:

```sh
pnpm nx component-test --watch
```

2. Open `src/app/recipe/recipe-filter.component.cy.ts`.

3. Fill the form by finding the inputs with their labels _(Keywords, Max Ingredients, Max Steps)_ then type using the `type()` command.

```ts
cy.findByLabelText('Keywords').type('...');
```

4. Spy on the `filterChange` output _(Cf. [🎁 Tip: Spying on component outputs](#-tip--spying-on-component-outputs))_ and check that it was called with the right filter object.

## Appendices

### 🎁 Tip: Spying on component outputs

There are multiple ways of spying on component outputs with Cypress Component Testing.
Here are some of them.

#### A. The `autoSpyOutputs` option

This will create a spy for each output of the component. The spy will use the output name as its alias.

```ts
cy.mount(RecipeFormComponent, {
  autoSpyOutputs: true,
});

cy.get('@recipeChange').should('be.calledWith', { name: 'Burger' });
```

##### ⚠️ This will not work with `RecipeFilterComponent`

The problem with this approach is that it only works with outputs implemented using `EventEmitter`.
If the output is implemented differently, like using another `Observable` implementation, this will replace the output property with a spy and break the component instead of subscribing to the observable.

Cf. [related issue https://github.com/cypress-io/cypress/issues/24445](https://github.com/cypress-io/cypress/issues/24445)

#### B. The `createOutputSpy` helper

This will create a spy for the given output name with the alias of our choice.

```ts
import { createOutputSpy } from 'cypress/angular';

cy.mount(RecipeFormComponent, {
  componentProperties: {
    recipeChange: createOutputSpy('recipeChange'),
  },
});
```

This will have the same limitation as [the previous approach](#a-the-autospyoutputs-option).

#### C. The template + spy approach

Instead of mounting the component we can use a template which will create a wrapper component for us.

This wrapper can take the spy as a property and use it as a callback of the output.

```ts
cy.mount('<wm-recipe-form (recipeChange)="onRecipeChange($event)"></wm-recipe-form>', {
  /* Don't forget to import the component. */
  imports: [RecipeFormComponent],
  componentProperties: {
    onRecipeChange: cy.spy().as('recipeChange'),
  },
});
```

This approach has two main advantages:

- it will work with any `Observable` implementation,
- and it makes the test more readable and inspiring. Remember that the tests are also documentation.

The only drawback is that it is a bit more verbose and will require more boilerplate to forward all inputs.

#### D. The custom `spyOuput` helper

As a trade-off between the previous approaches, we created a custom helper in `cypress/support/spy-output.ts` that works like this:

```ts
cy.mount(RecipeFormComponent).then(spyOutput('recipeChange'));

cy.get('@recipeChange').should('be.calledWith', { name: 'Burger' });
```
