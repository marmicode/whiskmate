import { RecipeFilter } from './recipe-filter.ng';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

describe(RecipeFilter.name, () => {
  it.todo('🚧 should trigger filterChange output');

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
