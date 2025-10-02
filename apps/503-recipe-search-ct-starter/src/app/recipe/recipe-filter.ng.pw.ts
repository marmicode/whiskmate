import { expect, test } from '@jscutlery/playwright-ct-angular';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
import { RecipeFilter } from './recipe-filter.ng';

test.describe('RecipeFilter', () => {
  test('should trigger filterChange', async ({ page, mount }) => {
    let filter: RecipeFilterCriteria | undefined;
    await mount(RecipeFilter, {
      on: {
        filterChange(_filter: RecipeFilterCriteria) {
          filter = _filter;
        },
      },
    });

    await page.getByLabel('Keywords').fill('Burger');

    expect(filter).toMatchObject({
      keywords: 'Burger',
    });
  });
});
