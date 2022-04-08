import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mount } from '@jscutlery/cypress-angular/mount';
import { getHarness } from '@jscutlery/cypress-harness';
import { styles, stylesheets } from './../../styles';
import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeSearchHarness } from './recipe-search.harness';

describe(RecipeSearchComponent.name, () => {
  const harness = getHarness(RecipeSearchHarness);

  beforeEach(() =>
    mount(RecipeSearchComponent, {
      imports: [BrowserAnimationsModule],
      stylesheets,
      styles,
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
