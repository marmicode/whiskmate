import { RecipeFilterComponent } from './recipe-filter.component';
import { getHarness } from '@jscutlery/cypress-harness';
import { RecipeFilterHarness } from './recipe-filter.harness';

describe(RecipeFilterComponent.name, () => {
  it('should trigger filterChange output', () => {
    const { getFilterChangeSpy, harness } = renderComponent();

    harness.setValue({
      keywords: 'Burger',
      maxIngredientCount: 3,
      maxStepCount: 5,
    });

    getFilterChangeSpy().should('have.been.calledWith', {
      keywords: 'Burger',
      maxIngredientCount: 3,
      maxStepCount: 5,
    });

    cy.percySnapshot();
  });

  function renderComponent() {
    cy.mount(
      '<wm-recipe-filter (filterChange)="onFilterChange($event)"></wm-recipe-filter>',
      {
        imports: [RecipeFilterComponent],
        componentProperties: {
          onFilterChange: cy.spy().as('filterChange'),
        },
      }
    );

    return {
      harness: getHarness(RecipeFilterHarness),
      getFilterChangeSpy() {
        return cy.get('@filterChange');
      },
    };
  }
});
