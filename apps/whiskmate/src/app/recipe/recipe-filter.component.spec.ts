import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RecipeFilterComponent } from './recipe-filter.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event/index';

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
