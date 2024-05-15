import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { observe } from '../../testing/observe';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterComponent } from './recipe-filter.component';

describe(RecipeFilterComponent.name, () => {
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
    } as RecipeFilter);
  });

  async function renderComponent() {
    const { fixture } = await render(RecipeFilterComponent);

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
