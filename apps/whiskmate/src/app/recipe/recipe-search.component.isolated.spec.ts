import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearchComponent } from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = createComponent();

    expect(await getRecipeNames()).toEqual(['Burger', 'Salad']);
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
      async getRecipeNames() {
        TestBed.tick();
        await TestBed.inject(ApplicationRef).whenStable();
        return component.recipes.value()?.map((recipe) => recipe.name);
      },
    };
  }
});
