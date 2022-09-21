import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getHarness } from '@jscutlery/cypress-harness';
import { mount } from 'cypress/angular';
import {
  RecipeSearchComponent,
  RecipeSearchModule,
} from './recipe-search.component';
import { RecipeSearchHarness } from './recipe-search.harness';

describe(RecipeSearchComponent.name, () => {
  const harness = getHarness(RecipeSearchHarness);

  beforeEach(() =>
    mount('<wm-recipe-search></wm-recipe-search>', {
      imports: [BrowserAnimationsModule, RecipeSearchModule],
    })
  );

  it('should show recipes', () => {
    const recipeNames = harness.getRecipeNames();
    recipeNames.should(
      'contain',
      'Cauliflower, pomegranate and pistachio salad'
    );
    recipeNames.should('have.length', 10);
  });

  it('should filter recipes', () => {
    harness.getFilter().setValue({
      maxIngredientCount: 10,
      maxStepCount: 3,
    });
    harness.getRecipeNames().should('have.length', 1);
  });

  it('should disabled recipe once added', () => {
    harness.getFirstRecipeAddButton().isDisabled().should('equal', false);
    harness.getFirstRecipeAddButton().then((harness) => harness.click());
    harness.getFirstRecipeAddButton().isDisabled().should('equal', true);
  });
});
