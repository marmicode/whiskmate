import { expect, test } from '@jscutlery/playwright-ct-angular';
import { RecipeFilterComponent } from './recipe-filter.component';

test.describe('<wm-recipe-filter>', () => {
  test('should show recipe name', async ({ mount }) => {
    const component = await mount(RecipeFilterComponent, {
      spyOutputs: ['filterChange'],
    });

    await component.getByLabel('Keywords').fill('Burger');

    expect(component.spies.filterChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        keywords: 'Burger',
      })
    );
  });
});
