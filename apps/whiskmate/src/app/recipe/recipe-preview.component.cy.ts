import { RecipePreviewComponent } from './recipe-preview.component';
import { recipeMother } from '../testing/recipe.mother';
import { getHarness } from '@jscutlery/cypress-harness';
import { RecipePreviewHarness } from './recipe-preview.harness';

describe(RecipePreviewComponent.name, () => {
  it('should show recipe name', () => {
    const { harness } = renderComponent();

    harness.getName().should('eql', 'Burger');
  });

  function renderComponent() {
    cy.mount('<wm-recipe-preview [recipe]="recipe"></wm-recipe-preview>', {
      imports: [RecipePreviewComponent],
      componentProperties: {
        recipe: recipeMother.withBasicInfo('Burger').build(),
      },
    });

    return {
      harness: getHarness(RecipePreviewHarness),
    };
  }
});
