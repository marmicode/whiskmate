import { expect, test } from '@jscutlery/playwright-ct-angular';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipeFilter } from './recipe-filter';

test.describe('<wm-recipe-filter>', () => {
  test('should trigger filterChange', async ({ mount }) => {
    let filter: RecipeFilter | undefined;
    const component = await mount(RecipeFilterComponent, {
      on: {
        filterChange(_filter: RecipeFilter) {
          filter = _filter;
        },
      },
    });

    await component.getByLabel('Keywords').fill('Burger');

    expect(filter).toMatchObject({
      keywords: 'Burger',
    });
  });
});
