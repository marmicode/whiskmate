import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';
import {
  RecipeSearchComponent,
  RecipeSearchModule,
} from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  const papperdelle = {
    id: 'papperdelle-with-rose-harissa',
    name: 'Pappardelle with rose harissa, black olives and capers',
  } as Recipe;
  const puyLentil = {
    id: 'puy-lentil-and-aubergine-stew',
    name: 'Puy lentil and aubergine stew',
  } as Recipe;

  it('should search recipes without keyword on load', async () => {
    const { fixture, mockSearch } = await createComponent();

    mockSearch.mockReturnValue(of([papperdelle, puyLentil]));

    fixture.detectChanges();

    const names = fixture.debugElement
      .queryAll(By.css('[data-role=recipe-name]'))
      .map((el) => el.nativeElement.textContent);

    expect(names).toEqual([
      'Pappardelle with rose harissa, black olives and capers',
      'Puy lentil and aubergine stew',
    ]);
    expect(mockSearch).toBeCalledTimes(1);
    expect(mockSearch).toBeCalledWith({});
  });

  async function createComponent() {
    const mockSearch = jest.fn() as jest.MockedFunction<
      typeof RecipeRepository.prototype.search
    >;

    await TestBed.configureTestingModule({
      imports: [RecipeSearchModule],
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
