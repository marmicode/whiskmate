import { of } from 'rxjs';
import { RecipeFilter } from './recipe-filter';
import { RecipeRepository } from './recipe-repository.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getHarness } from '@jscutlery/cypress-harness';
import { mount } from 'cypress/angular';
import {
  RecipeSearchComponent,
  RecipeSearchModule,
} from './recipe-search.component';
import { RecipeSearchHarness } from './recipe-search.harness';

class FakeRecipeRepository {
  _recipes = [
    {
      id: 'cauliflower-pomegranate-and-pistachio-salad',
      name: 'Cauliflower, pomegranate and pistachio salad',
      pictureUri:
        'https://media.istockphoto.com/photos/fresh-cauliflower-with-pieces-isolated-on-white-picture-id511868689?k=20&m=511868689&s=612x612&w=0&h=UZxuS1zMfMaYm1ag2tBFUG-JO4TJRS_jzSOB7hseX5k=',
    },
    {
      id: 'braised-eggs-with-leek-and-za-atar',
      name: 'Braised eggs with leek and za’atar',
      pictureUri:
        'https://healthynibblesandbits.com/wp-content/uploads/2015/10/Fried-Egg-Breakfast-FF.jpg',
    },
  ];

  search(filter: RecipeFilter) {
    return of(
      Object.entries(filter).length === 0 ? this._recipes : [this._recipes[0]]
    );
  }
}

describe(RecipeSearchComponent.name, () => {
  const harness = getHarness(RecipeSearchHarness);

  beforeEach(() =>
    mount('<wm-recipe-search></wm-recipe-search>', {
      imports: [BrowserAnimationsModule, RecipeSearchModule],
      providers: [
        {
          provide: RecipeRepository,
          useClass: FakeRecipeRepository,
        },
      ],
    })
  );

  it('should show recipes', () => {
    const recipeNames = harness.getRecipeNames();
    recipeNames.should(
      'contain',
      'Cauliflower, pomegranate and pistachio salad'
    );
    recipeNames.should('have.length', 2);
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
