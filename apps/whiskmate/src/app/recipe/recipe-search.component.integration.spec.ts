import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeRepositoryFake } from './recipe-repository.service.fake';
import { recipeMother } from '../testing/recipe.mother';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', () => {
    const { getRecipeNames } = renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  function renderComponent() {
    const fakeRepo = new RecipeRepositoryFake();

    fakeRepo.setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
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
        return fixture.debugElement
          .queryAll(By.css('[data-role=recipe-name]'))
          .map((el) => el.nativeElement.textContent);
      },
    };
  }
});
