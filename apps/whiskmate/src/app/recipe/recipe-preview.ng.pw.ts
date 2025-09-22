import { test } from '@jscutlery/playwright-ct-angular';
import { RecipePreview } from './recipe-preview.ng';

test.describe('<wm-recipe-preview>', () => {
  test('should show recipe name', async ({ mount }) => {
    test.skip(true, '🚧 work in progress!');

    await mount(RecipePreview);
  });
});
