import { TestBed } from '@angular/core/testing';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('🚧 should search recipes without filtering');

  async function renderComponent() {
    const fixture = TestBed.createComponent(RecipeSearch);
    await fixture.whenStable();

    return {};
  }
});
