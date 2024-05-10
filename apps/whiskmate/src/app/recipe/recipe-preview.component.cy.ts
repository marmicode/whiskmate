import { RecipePreviewComponent } from './recipe-preview.component';
import { recipeMother } from '../testing/recipe.mother';

describe(RecipePreviewComponent.name, () => {
  it('should show recipe name', () => {
    cy.mount(`<wm-recipe-preview [recipe]="recipe">`, {
      imports: [RecipePreviewComponent],
      componentProperties: {
        recipe: recipeMother.withBasicInfo('Burger').build(),
      },
    });

    cy.findByRole('heading').should('have.text', 'Burger');
  });
});
