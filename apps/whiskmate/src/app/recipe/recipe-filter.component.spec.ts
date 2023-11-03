import { RecipeFilterComponent } from './recipe-filter.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

describe(RecipeFilterComponent.name, () => {
  it.todo('🚧 should trigger filterChange output');

  async function renderComponent() {
    const { fixture } = await render(RecipeFilterComponent);

    return {
      component: fixture.componentInstance,
      async setInputValue(
        label: 'Keywords' | 'Max Ingredients' | 'Max Steps',
        value: string
      ) {
        const inputEl = screen.getByLabelText(label);
        await userEvent.type(inputEl, value);
      },
    };
  }
});
