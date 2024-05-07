import { expect, test } from '@jscutlery/playwright-ct-angular';
import { RecipeSearchTestContainerComponent } from './recipe-search.test-container';
import { recipeMother } from '../testing/recipe.mother';
import { Recipe } from './recipe';

test.describe('<wm-recipe-search>', () => {
  test('should show recipes', async ({ mount }) => {
    const component = await mount(RecipeSearchTestContainerComponent);

    await expect(component.getByRole('heading', { level: 2 })).toHaveText([
      'Burger',
      'Salad',
    ]);
  });

  test('should filter recipes', async ({ mount }) => {
    const component = await mount(RecipeSearchTestContainerComponent);

    await component.getByLabel('Keywords').fill('Bur');

    await expect(component.getByRole('heading', { level: 2 })).toHaveText([
      'Burger',
    ]);
  });

  test('should add recipe to meal plan', async ({ mount }) => {
    let recipes: Recipe[] | undefined;
    const component = await mount(RecipeSearchTestContainerComponent, {
      on: {
        mealPlannerRecipesChange(_recipes: Recipe[]) {
          recipes = _recipes;
        },
      },
    });

    await component.getByRole('button', { name: 'ADD' }).first().click();

    /* There is only a burger in the meal planner. */
    expect(recipes).toContainEqual(expect.objectContaining({ name: 'Burger' }));
  });

  test('should disable add button if recipe is already in meal plan', async ({
    mount,
  }) => {
    const component = await mount(RecipeSearchTestContainerComponent, {
      props: {
        mealPlannerRecipes: [recipeMother.withBasicInfo('Burger').build()],
      },
    });

    await expect(
      component.getByRole('button', { name: 'ADD' }).first()
    ).toBeDisabled();
  });
});
