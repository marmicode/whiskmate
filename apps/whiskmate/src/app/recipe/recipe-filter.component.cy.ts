import { RecipeFilterComponent } from './recipe-filter.component';
import { spyOutput } from '../../../cypress/support/spy-output';

describe(RecipeFilterComponent.name, () => {
  it('should trigger filterChange output', () => {
    cy.mount(RecipeFilterComponent).then(spyOutput('filterChange'));

    cy.findByLabelText('Keywords').type('Burger');

    cy.get('@filterChange').should('be.calledWithMatch', {
      keywords: 'Burger',
    });
  });
});
