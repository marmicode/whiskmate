import { RecipeRepository } from './recipe-repository.service';
import { TestBed } from '@angular/core/testing';
import { RecipeSearchComponent } from './recipe-search.component';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import { firstValueFrom } from 'rxjs';

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
        const recipes = await firstValueFrom(component.recipes$);
        return recipes.map((recipe) => recipe.name);
      },
    };
  }
});
