import { SinonStub } from 'cypress/types/sinon';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipeFilter } from './recipe-filter';
import { spyOutput } from '../../../cypress/support/spy-output';

describe(RecipeFilterComponent.name, () => {
  it('should trigger filterChange output', () => {
    const { getFilterChangeSpy, typeInput } = renderComponent();

    typeInput('Keywords', 'Burger');
    typeInput('Max Ingredients', '3');
    typeInput('Max Steps', '5');

    getFilterChangeSpy().should('have.been.calledWith', {
      keywords: 'Burger',
      maxIngredientCount: 3,
      maxStepCount: 5,
    });
  });

  function renderComponent() {
    cy.mount(RecipeFilterComponent).then(spyOutput('filterChange'));

    return {
      typeInput(
        inputLabel: 'Keywords' | 'Max Ingredients' | 'Max Steps',
        value: string
      ) {
        /* We have to click on the label first.
         * Otherwise, the label catches the click when we try to click on the input.
         * The other alternative is using the `force` option but this can cause false negatives,
         * and we might miss issues likes overlays or layout errors. */
        cy.findByText(inputLabel).click();
        cy.findByLabelText(inputLabel).type(value);
      },
      getFilterChangeSpy() {
        return cy.get<SinonStub<[RecipeFilter]>>('@filterChange');
      },
    };
  }
});
