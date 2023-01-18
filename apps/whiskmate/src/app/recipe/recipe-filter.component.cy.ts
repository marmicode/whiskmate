import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipeFilter } from './recipe-filter';
import { spyOutput } from '../../testing/cypress-observer';
import { SinonStub } from 'cypress/types/sinon';

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
        keywords: string
      ) {
        cy.findByLabelText(inputLabel).type(keywords, { force: true });
      },
      getFilterChangeSpy() {
        return cy.get<SinonStub<[RecipeFilter]>>('@filterChange');
      },
    };
  }
});
