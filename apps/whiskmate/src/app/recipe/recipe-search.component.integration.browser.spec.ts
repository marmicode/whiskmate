import { render } from '@testing-library/angular';
import { page } from '@vitest/browser/context';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearchComponent } from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    await expect.poll(() => getRecipeNames()).toHaveLength(2);
    await expect.element(getRecipeNames()[0]).toHaveTextContent('Burger');
    await expect.element(getRecipeNames()[1]).toHaveTextContent('Salad');
  });

  async function renderComponent() {
    await render(RecipeSearchComponent, {
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

    return {
      getRecipeNames() {
        return page.getByRole('heading').all();
      },
    };
  }
});
