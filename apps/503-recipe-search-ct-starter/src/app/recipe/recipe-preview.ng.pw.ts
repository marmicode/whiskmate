import { expect, test } from '@jscutlery/playwright-ct-angular';
import { recipeMother } from '../testing/recipe.mother';
import { RecipePreview } from './recipe-preview.ng';

test.describe('RecipePreview', () => {
  test('should show recipe name', async ({ page, mount }) => {
    const recipe = recipeMother.withBasicInfo('Burger').build();

    await mount(RecipePreview, {
      props: {
        recipe,
      },
    });

    await expect(page.getByRole('heading')).toHaveText('Burger');
  });
});
