import { expect, test } from '@jscutlery/playwright-ct-angular';
import { recipeMother } from '../testing/recipe.mother';
import { Recipe } from './recipe';
import { RecipeSearchTestContainer } from './recipe-search.test-container.ng';

test.describe('RecipeSearch', () => {
  test('should show recipes', async ({ page, mount }) => {
    await mount(RecipeSearchTestContainer);

    await expect(page.getByRole('heading', { level: 2 })).toHaveText([
      'Burger',
      'Salad',
    ]);
  });

  test('should filter recipes', async ({ page, mount }) => {
    await mount(RecipeSearchTestContainer);

    await page.getByLabel('Keywords').fill('Bur');

    await expect(page.getByRole('heading', { level: 2 })).toHaveText([
      'Burger',
    ]);
  });

  test('should add recipe to meal plan', async ({ page, mount }) => {
    let recipes: Recipe[] | undefined;
    await mount(RecipeSearchTestContainer, {
      on: {
        mealPlannerRecipesChange(_recipes: Recipe[]) {
          recipes = _recipes;
        },
      },
    });

    await page.getByRole('button', { name: 'ADD' }).first().click();

    /* There is only a burger in the meal planner. */
    expect(recipes).toContainEqual(expect.objectContaining({ name: 'Burger' }));
  });

  test('should disable add button if recipe is already in meal plan', async ({
    page,
    mount,
  }) => {
    await mount(RecipeSearchTestContainer, {
      props: {
        mealPlannerRecipes: [recipeMother.withBasicInfo('Burger').build()],
      },
    });

    await expect(
      page.getByRole('button', { name: 'ADD' }).first(),
    ).toBeDisabled();
  });
});
