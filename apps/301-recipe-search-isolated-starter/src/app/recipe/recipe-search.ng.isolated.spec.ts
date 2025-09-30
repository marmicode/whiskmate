import { TestBed } from '@angular/core/testing';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('🚧 should search recipes without keyword on load');

  function createComponent() {
    TestBed.configureTestingModule({ providers: [RecipeSearch] });

    const component = TestBed.inject(RecipeSearch);

    component.ngOnInit();

    return { component };
  }
});
