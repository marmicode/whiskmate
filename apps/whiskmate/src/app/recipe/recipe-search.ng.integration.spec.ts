import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RecipeSearch } from './recipe-search.ng';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';

describe(RecipeSearch.name, () => {
  it.todo('🚧 should search recipes without filtering');

  async function renderComponent() {
    TestBed.configureTestingModule({
      providers: [
        provideRecipeRepositoryFake(),
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    const fixture = TestBed.createComponent(RecipeSearch);
    await fixture.whenStable();

    return {};
  }
});
