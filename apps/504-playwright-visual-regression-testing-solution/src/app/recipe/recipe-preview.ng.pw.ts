import { expect, test } from '@jscutlery/playwright-ct-angular';
import { recipeMother } from '../testing/recipe.mother';
import { RecipePreview } from './recipe-preview.ng';

test.describe('RecipePreview', () => {
  test('should show recipe name', async ({ page, mount }) => {
    const recipe = recipeMother.withBasicInfo('Burger').build();

    /* Let's listen to the picture loading. */
    const pictureFinishedPromise = page
      .waitForResponse(recipe.pictureUri)
      .then((response) => response.finished());

    await mount(RecipePreview, {
      props: {
        recipe,
      },
    });

    await expect(page.getByRole('heading')).toHaveText('Burger');

    /* Make sure the picture is loaded before taking screenshot. */
    await pictureFinishedPromise;

    await expect(page).toHaveScreenshot();
  });
});
