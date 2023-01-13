import { RecipeRepository } from './recipe-repository.service';
import { TestBed } from '@angular/core/testing';
import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeRepositoryFake } from './recipe-repository.service.fake';
import { recipeMother } from '../testing/recipe.mother';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', () => {
    const { component } = createComponent();

    expect(component.recipes).toEqual([
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });

  function createComponent() {
    const fakeRepo = new RecipeRepositoryFake();

    fakeRepo.setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.configureTestingModule({
      providers: [
        RecipeSearchComponent,
        {
          provide: RecipeRepository,
          useValue: fakeRepo,
        },
      ],
    });

    const component = TestBed.inject(RecipeSearchComponent);

    component.ngOnInit();

    return { component };
  }
});
