import { RecipeSearchComponent } from './recipe-search.component';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import { render, screen } from '@testing-library/angular';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  async function renderComponent() {
    const { detectChanges } = await render(RecipeSearchComponent, {
      providers: [provideRecipeRepositoryFake()],
      configureTestBed(testBed) {
        testBed
          .inject(RecipeRepositoryFake)
          .setRecipes([
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
          ]);
      },
    });
    /* @hack trigger a second round of change detection after effects are flushed. */
    detectChanges();

    return {
      getRecipeNames() {
        return screen.queryAllByRole('heading').map((el) => el.textContent);
      },
    };
  }
});
