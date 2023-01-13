import { TestBed } from '@angular/core/testing';
import { RecipeSearchComponent } from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  it.todo('🚧 should search recipes without keyword on load');

  function createComponent() {
    TestBed.configureTestingModule({
      providers: [RecipeSearchComponent],
    });

    const component = TestBed.inject(RecipeSearchComponent);

    component.ngOnInit();

    return { component };
  }
});
