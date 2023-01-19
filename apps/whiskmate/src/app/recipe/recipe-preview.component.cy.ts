import { RecipePreviewComponent } from './recipe-preview.component';
import { recipeMother } from '../testing/recipe.mother';
import { getHarness } from '@jscutlery/cypress-harness';
import { RecipePreviewHarness } from './recipe-preview.harness';

describe(RecipePreviewComponent.name, () => {
  xit('should show recipe name', () => {
    const { harness } = renderComponent();

    throw new Error('🚧 work in progress!');
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
