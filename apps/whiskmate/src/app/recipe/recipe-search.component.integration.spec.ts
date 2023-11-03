import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', () => {
    const { getRecipeNames } = renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  function renderComponent() {
    TestBed.configureTestingModule({
      providers: [provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

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
