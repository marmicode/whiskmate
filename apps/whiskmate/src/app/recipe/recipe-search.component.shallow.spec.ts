import { RecipeFilter } from './recipe-filter';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';
import { CommonModule } from '@angular/common';
import { RecipePreviewComponent } from './recipe-preview.component';

describe(RecipeSearchComponent.name, () => {
  const papperdelle = {
    id: 'papperdelle-with-rose-harissa',
    name: 'Pappardelle with rose harissa, black olives and capers',
  } as Recipe;
  const puyLentil = {
    id: 'puy-lentil-and-aubergine-stew',
    name: 'Puy lentil and aubergine stew',
  } as Recipe;

  it('should search recipes without filtering', () => {
    const { mockRepo, render, getDisplayedRecipes } = createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle, puyLentil]));

    render();

    expect(getDisplayedRecipes()).toEqual([papperdelle, puyLentil]);

    expect(mockRepo.search).toBeCalledTimes(1);
    expect(mockRepo.search).toBeCalledWith({});
  });

  it('should search recipes using given filter', async () => {
    const {
      mockRepo,
      render,
      getDisplayedRecipes,
      updateFilter,
    } = await createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle, puyLentil]));

    await render();

    mockRepo.search.mockReturnValue(of([papperdelle]));

    updateFilter({
      keywords: 'Papperdelle',
      maxIngredientCount: 3,
    });

    expect(getDisplayedRecipes()).toEqual([papperdelle]);

    expect(mockRepo.search).toBeCalledTimes(2);
    expect(mockRepo.search).lastCalledWith<[RecipeFilter]>({
      keywords: 'Papperdelle',
      maxIngredientCount: 3,
    });
  });

  function createComponent() {
    const mockRepo = { search: jest.fn() } as jest.Mocked<
      Pick<RecipeRepository, 'search'>
    >;

    TestBed.configureTestingModule({
      providers: [
        {
          provide: RecipeRepository,
          useValue: mockRepo,
        },
      ],
    });

    TestBed.overrideComponent(RecipeSearchComponent, {
      set: {
        imports: [CommonModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    let fixture: ComponentFixture<RecipeSearchComponent>;

    return {
      mockRepo,
      render() {
        fixture = TestBed.createComponent(RecipeSearchComponent);
        fixture.detectChanges();
      },
      getDisplayedRecipes() {
        return fixture.debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe);
      },
      updateFilter(filter: RecipeFilter) {
        fixture.debugElement
          .query(By.css('wm-recipe-filter'))
          .triggerEventHandler('filterChange', filter);
        fixture.detectChanges();
      },
    };
  }
});
