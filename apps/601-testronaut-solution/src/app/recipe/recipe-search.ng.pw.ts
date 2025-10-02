import { expect, test } from '@testronaut/angular';
import { recipeMother } from '../testing/recipe.mother';
import { RecipeSearchTestContainer } from './recipe-search.test-container.ng';

test.describe('RecipeSearch', () => {
  test('should show recipes', async ({ page, mount }) => {
    await mount('show recipes', RecipeSearchTestContainer);

    await expect(page.getByRole('heading', { level: 2 })).toHaveText([
      'Burger',
      'Salad',
    ]);
  });

  test('should filter recipes', async ({ page, mount }) => {
    await mount('filter recipes', RecipeSearchTestContainer);

    await page.getByLabel('Keywords').fill('Bur');

    await expect(page.getByRole('heading', { level: 2 })).toHaveText([
      'Burger',
    ]);
  });

  test('should add recipe to meal plan', async ({ page, mount }) => {
    const { outputs } = await mount(
      'add recipe to meal plan',
      RecipeSearchTestContainer,
    );

    await page.getByRole('button', { name: 'ADD' }).first().click();

    /* There is only a burger in the meal planner. */
    expect(outputs.mealPlannerRecipesChange.calls).toMatchObject([
      [expect.objectContaining({ name: 'Burger' })],
    ]);
  });

  test('should disable add button if recipe is already in meal plan', async ({
    page,
    mount,
  }) => {
    await mount(
      'disable add button if recipe is already in meal plan',
      RecipeSearchTestContainer,
      {
        inputs: {
          mealPlannerRecipes: [recipeMother.withBasicInfo('Burger').build()],
        },
      },
    );

    await expect(
      page.getByRole('button', { name: 'ADD' }).first(),
    ).toBeDisabled();
  });
});
