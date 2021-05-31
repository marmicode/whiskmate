import { MealPlanner } from './../meal-planner/meal-planner.service';
import { RecipeFilter } from './recipe-filter';
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
    const {
      fixture,
      mockSearch,
      getRecipePreviewRecipes,
    } = await createComponent();

    mockSearch.mockReturnValue(of([papperdelle, puyLentil]));

    fixture.detectChanges();

    expect(getRecipePreviewRecipes()).toEqual([papperdelle, puyLentil]);

    expect(mockSearch).toBeCalledTimes(1);
    expect(mockSearch).toBeCalledWith({});
  });

  it('should search recipes using given filter', async () => {
    const {
      fixture,
      mockSearch,
      getRecipePreviewRecipes,
    } = await createComponent();

    mockSearch.mockReturnValue(of([papperdelle]));

    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('wm-recipe-filter'))
      .triggerEventHandler('filterChange', {
        keywords: 'Papperdelle',
        maxIngredientCount: 3,
      } as RecipeFilter);

    expect(getRecipePreviewRecipes()).toEqual([papperdelle]);

    expect(mockSearch).toBeCalledTimes(2);
    expect(mockSearch).lastCalledWith({
      keywords: 'Papperdelle',
      maxIngredientCount: 3,
    } as RecipeFilter);
  });

  it('should add recipe to meal planner', async () => {
    const { fixture, mockAddRecipe, mockSearch } = await createComponent();

    mockSearch.mockReturnValue(of([papperdelle]));

    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('[data-role=add-recipe]'))
      .triggerEventHandler('click', {});

    expect(mockAddRecipe).toBeCalledTimes(1);
    expect(mockAddRecipe).toBeCalledWith(papperdelle);
  });

  it("should disable add button if can't add", async () => {
    const {
      fixture,
      mockSearch,
      mockWatchCanAddRecipe,
    } = await createComponent();

    mockSearch.mockReturnValue(of([papperdelle]));
    mockWatchCanAddRecipe.mockReturnValue(of(false));

    fixture.detectChanges();

    const isButtonDisabled = fixture.debugElement.query(
      By.css('[data-role=add-recipe]')
    ).properties.disabled;

    expect(isButtonDisabled).toBe(true);
    expect(mockWatchCanAddRecipe).toBeCalledTimes(1);
    expect(mockWatchCanAddRecipe).toBeCalledWith(papperdelle);
  });

  async function createComponent() {
    const mockAddRecipe = jest.fn() as jest.MockedFunction<
      typeof MealPlanner.prototype.addRecipe
    >;
    const mockWatchCanAddRecipe = jest.fn() as jest.MockedFunction<
      typeof MealPlanner.prototype.watchCanAddRecipe
    >;

    const mockSearch = jest.fn() as jest.MockedFunction<
      typeof RecipeRepository.prototype.search
    >;

    await TestBed.configureTestingModule({
      declarations: [RecipeSearchComponent],
      providers: [
        {
          provide: MealPlanner,
          useValue: {
            addRecipe: mockAddRecipe,
            watchCanAddRecipe: mockWatchCanAddRecipe,
          } as Partial<MealPlanner>,
        },
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
      mockAddRecipe,
      mockWatchCanAddRecipe,
      getRecipePreviewRecipes() {
        return fixture.debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe);
      },
    };
  }
});
