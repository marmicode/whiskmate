import { of } from 'rxjs';
import { RecipeRepository } from './recipe-repository.service';
import { TestBed } from '@angular/core/testing';
import { RecipeSearchComponent } from './recipe-search.component';
import { Recipe } from './recipe';

describe(RecipeSearchComponent.name, () => {
  const papperdelle = { id: 'papperdelle-with-rose-harissa' } as Recipe;
  const puyLentil = { id: 'puy-lentil-and-aubergine-stew' } as Recipe;

  it('should search recipes without keyword on load', () => {
    const { component, mockSearch } = createComponent();

    mockSearch.mockReturnValue(of([papperdelle, puyLentil]));

    component.ngOnInit();

    expect(component.recipes).toEqual([papperdelle, puyLentil]);

    expect(mockSearch).toBeCalledTimes(1);
    expect(mockSearch).toBeCalledWith();
  });

  function createComponent() {
    const mockSearch = jest.fn() as jest.MockedFunction<
      typeof RecipeRepository.prototype.search
    >;

    TestBed.configureTestingModule({
      providers: [
        RecipeSearchComponent,
        {
          provide: RecipeRepository,
          useValue: {
            search: mockSearch,
          } as Partial<RecipeRepository>,
        },
      ],
    });

    return { component: TestBed.inject(RecipeSearchComponent), mockSearch };
  }
});
