import { TestBed } from '@angular/core/testing';
import { RecipeSearchComponent } from './recipe-search.component';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = createComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  function createComponent() {
    TestBed.configureTestingModule({
      providers: [RecipeSearchComponent, provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    const component = TestBed.inject(RecipeSearchComponent);

    return {
      component,
      getRecipeNames() {
        TestBed.flushEffects();
        return component.recipes()?.map((recipe) => recipe.name);
      },
    };
  }
});
