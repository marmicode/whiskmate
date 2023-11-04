import { expect, test } from '@jscutlery/playwright-ct-angular';
import { RecipeSearchTestContainerComponent } from './recipe-search.test-container';
import { recipeMother } from '../testing/recipe.mother';

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
    const component = await mount(RecipeSearchTestContainerComponent, {
      spyOutputs: ['mealPlannerRecipesChange'],
    });

    await component.getByRole('button', { name: 'ADD' }).first().click();

    /* There is only a burger in the meal planner. */
    expect(component.spies.mealPlannerRecipesChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ name: 'Burger' }),
    ]);
  });

  test('should disable add button if recipe is already in meal plan', async ({
    mount,
  }) => {
    const component = await mount(RecipeSearchTestContainerComponent, {
      inputs: {
        mealPlannerRecipes: [recipeMother.withBasicInfo('Burger').build()],
      },
    });

    await expect(
      component.getByRole('button', { name: 'ADD' }).first()
    ).toBeDisabled();
  });
});
