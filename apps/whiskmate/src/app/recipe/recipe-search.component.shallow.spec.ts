import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
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

  it('should search recipes without keyword on load', async () => {
    const { fixture, mockSearch } = await createComponent();

    mockSearch.mockReturnValue(of([papperdelle, puyLentil]));

    fixture.detectChanges();

    const recipes = fixture.debugElement
      .queryAll(By.css('wm-recipe-preview'))
      .map((previewEl) => previewEl.properties.recipe);

    expect(recipes).toEqual([papperdelle, puyLentil]);

    expect(mockSearch).toBeCalledTimes(1);
    expect(mockSearch).toBeCalledWith();
  });

  async function createComponent() {
    const mockSearch = jest.fn() as jest.MockedFunction<
      typeof RecipeRepository.prototype.search
    >;

    await TestBed.configureTestingModule({
      declarations: [RecipeSearchComponent],
      providers: [
        {
          provide: RecipeRepository,
          useValue: {
            search: mockSearch,
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeSearchComponent);

    return {
      component: fixture.componentInstance,
      fixture,
      mockSearch,
    };
  }
});
