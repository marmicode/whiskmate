import { expect, test } from '@testronaut/angular';
import { RecipeFilter } from './recipe-filter.ng';

test.describe('RecipeFilter', () => {
  test('should trigger filterChange', async ({ page, mount }) => {
    const { outputs } = await mount('trigger filterChange', RecipeFilter);
    await page.getByLabel('Keywords').fill('Burger');
    expect(outputs.filterChange.calls).toMatchObject([
      {
        keywords: 'Burger',
      },
    ]);
  });
});
