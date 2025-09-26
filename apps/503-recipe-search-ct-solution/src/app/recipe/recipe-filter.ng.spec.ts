import { RecipeFilter } from './recipe-filter.ng';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { observe } from '../../testing/observe';
import { RecipeFilterCriteria } from './recipe-filter-criteria';

describe(RecipeFilter.name, () => {
  it('should trigger filterChange output', async () => {
    const { component, setInputValue } = await renderComponent();

    using observer = observe(component.filterChange);

    await setInputValue('Keywords', 'Cauliflower');
    await setInputValue('Max Ingredients', '3');
    await setInputValue('Max Steps', '10');

    expect(observer.next).toHaveBeenLastCalledWith({
      keywords: 'Cauliflower',
      maxIngredientCount: 3,
      maxStepCount: 10,
    } satisfies RecipeFilterCriteria);
  });

  async function renderComponent() {
    const { fixture } = await render(RecipeFilter);

    return {
      component: fixture.componentInstance,
      async setInputValue(
        label: 'Keywords' | 'Max Ingredients' | 'Max Steps',
        value: string,
      ) {
        const inputEl = screen.getByLabelText(label);
        await userEvent.type(inputEl, value);
      },
    };
  }
});
