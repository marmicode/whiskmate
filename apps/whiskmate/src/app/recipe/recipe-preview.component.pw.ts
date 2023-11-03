import { expect, test } from '@jscutlery/playwright-ct-angular';
import { RecipePreviewComponent } from './recipe-preview.component';
import { recipeMother } from '../testing/recipe.mother';

test.describe('<wm-recipe-preview>', () => {
  test('should show recipe name', async ({ mount }) => {
    const locator = await mount(RecipePreviewComponent, {
      inputs: {
        recipe: recipeMother.withBasicInfo('Burger').build(),
      },
    });

    await expect(locator.getByRole('heading')).toHaveText('Burger');
  });
});
