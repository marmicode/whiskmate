import { test } from '@jscutlery/playwright-ct-angular';
import { RecipePreviewComponent } from './recipe-preview.component';

test.describe('<wm-recipe-preview>', () => {
  test('should show recipe name', async ({ mount }) => {
    test.skip(true, '🚧 work in progress!');

    await mount(RecipePreviewComponent);
  });
});