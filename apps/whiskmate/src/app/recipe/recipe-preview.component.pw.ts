import { expect, test } from '@jscutlery/playwright-ct-angular';
import { RecipePreviewComponent } from './recipe-preview.component';
import { recipeMother } from '../testing/recipe.mother';

test.describe('<wm-recipe-preview>', () => {
  test('should show recipe name', async ({ page, mount }) => {
    const recipe = recipeMother.withBasicInfo('Burger').build();

    /* Let's listen to the picture loading. */
    const pictureFinishedPromise = page
      .waitForResponse(recipe.pictureUri)
      .then((response) => response.finished());

    const locator = await mount(RecipePreviewComponent, {
      inputs: {
        recipe,
      },
    });

    await expect(locator.getByRole('heading')).toHaveText('Burger');

    /* Make sure the picture is loaded before taking screenshot. */
    await pictureFinishedPromise;

    await expect(page).toHaveScreenshot();
  });
});
