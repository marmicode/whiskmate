import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeRepositoryFake } from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';

describe(RecipeSearchComponent.name, () => {
  it.todo('🚧 should search recipes without filtering');

  function renderComponent() {
    const fakeRepo = new RecipeRepositoryFake();

    fakeRepo.setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: RecipeRepository,
          useValue: fakeRepo,
        },
      ],
    });

    const fixture = TestBed.createComponent(RecipeSearchComponent);
    fixture.detectChanges();

    return {
      getRecipeNames() {
        throw new Error('😱 Not implemented yet!');
      },
    };
  }
});
