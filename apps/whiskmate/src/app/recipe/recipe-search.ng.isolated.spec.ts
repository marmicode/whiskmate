import { TestBed } from '@angular/core/testing';
import { whenAppStable } from '../../testing/when-app-stable';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = createComponent();

    expect(await getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  function createComponent() {
    TestBed.configureTestingModule({
      providers: [RecipeSearch, provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    const component = TestBed.inject(RecipeSearch);

    return {
      async getRecipeNames() {
        await whenAppStable();
        return component.recipes.value()?.map((recipe) => recipe.name);
      },
    };
  }
});
