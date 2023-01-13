import { RecipeRepository } from './recipe-repository.service';
import { TestBed } from '@angular/core/testing';
import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeRepositoryFake } from './recipe-repository.service.fake';
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

    return {};
  }
});
