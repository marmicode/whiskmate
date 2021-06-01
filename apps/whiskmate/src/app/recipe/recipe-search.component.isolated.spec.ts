import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  const papperdelle = { id: 'papperdelle-with-rose-harissa' } as Recipe;
  const puyLentil = { id: 'puy-lentil-and-aubergine-stew' } as Recipe;

  it('should search recipes without keyword on load', async () => {
    const { component, mockRepo } = createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle, puyLentil]));

    expect(await firstValueFrom(component.items$)).toEqual([
      expect.objectContaining({ recipe: papperdelle }),
      expect.objectContaining({ recipe: puyLentil }),
    ]);

    expect(mockRepo.search).toBeCalledTimes(1);
    expect(mockRepo.search).toBeCalledWith({});
  });

  function createComponent() {
    const mockRepo = { search: jest.fn() } as jest.Mocked<
      Pick<RecipeRepository, 'search'>
    >;

    TestBed.configureTestingModule({
      providers: [
        RecipeSearchComponent,
        {
          provide: RecipeRepository,
          useValue: mockRepo,
        },
      ],
    });

    return { component: TestBed.inject(RecipeSearchComponent), mockRepo };
  }
});

async function firstValueFrom<T>(source: Observable<T>): Promise<T> {
  return source.pipe(first()).toPromise();
}
