import { TestBed } from '@angular/core/testing';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  const papperdelle = {
    id: 'papperdelle-with-rose-harissa',
    name: 'Pappardelle with rose harissa, black olives and capers',
  } as Recipe;
  const puyLentil = {
    id: 'puy-lentil-and-aubergine-stew',
    name: 'Puy lentil and aubergine stew',
  } as Recipe;

  it.todo('🚧 should search recipes without keyword on load');

  async function createComponent() {
    const mockSearch = jest.fn() as jest.MockedFunction<
      typeof RecipeRepository.prototype.search
    >;

    await TestBed.configureTestingModule({
      // @todo
      providers: [
        {
          provide: RecipeRepository,
          useValue: {
            search: mockSearch,
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeSearchComponent);

    return {
      component: fixture.componentInstance,
      fixture,
      mockSearch,
    };
  }
});
