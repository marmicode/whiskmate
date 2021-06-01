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
      mockRepo,
      getRecipePreviewRecipes,
    } = await createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle, puyLentil]));

    fixture.detectChanges();

    expect(getRecipePreviewRecipes()).toEqual([papperdelle, puyLentil]);

    expect(mockRepo.search).toBeCalledTimes(1);
    expect(mockRepo.search).toBeCalledWith({});
  });

  it('should search recipes using given filter', async () => {
    const {
      fixture,
      mockRepo,
      getRecipePreviewRecipes,
    } = await createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle]));

    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('wm-recipe-filter'))
      .triggerEventHandler('filterChange', {
        keywords: 'Papperdelle',
        maxIngredientCount: 3,
      } as RecipeFilter);

    expect(getRecipePreviewRecipes()).toEqual([papperdelle]);

    expect(mockRepo.search).toBeCalledTimes(2);
    expect(mockRepo.search).lastCalledWith({
      keywords: 'Papperdelle',
      maxIngredientCount: 3,
    } as RecipeFilter);
  });

  it('should add recipe to meal planner', async () => {
    const { fixture, mockMealPlanner, mockRepo } = await createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle]));

    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('[data-role=add-recipe]'))
      .triggerEventHandler('click', {});

    expect(mockMealPlanner.addRecipe).toBeCalledTimes(1);
    expect(mockMealPlanner.addRecipe).toBeCalledWith(papperdelle);
  });

  it("should disable add button if can't add", async () => {
    const { fixture, mockMealPlanner, mockRepo } = await createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle]));
    mockMealPlanner.watchCanAddRecipe.mockReturnValue(of(false));

    fixture.detectChanges();

    const isButtonDisabled = fixture.debugElement.query(
      By.css('[data-role=add-recipe]')
    ).properties.disabled;

    expect(isButtonDisabled).toBe(true);
    expect(mockMealPlanner.watchCanAddRecipe).toBeCalledTimes(1);
    expect(mockMealPlanner.watchCanAddRecipe).toBeCalledWith(papperdelle);
  });

  async function createComponent() {
    const mockMealPlanner = {
      addRecipe: jest.fn(),
      watchCanAddRecipe: jest.fn(),
    } as jest.Mocked<Pick<MealPlanner, 'addRecipe' | 'watchCanAddRecipe'>>;

    const mockRepo = { search: jest.fn() } as jest.Mocked<
      Pick<RecipeRepository, 'search'>
    >;

    await TestBed.configureTestingModule({
      declarations: [RecipeSearchComponent],
      providers: [
        {
          provide: MealPlanner,
          useValue: mockMealPlanner,
        },
        {
          provide: RecipeRepository,
          useValue: mockRepo,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeSearchComponent);

    return {
      component: fixture.componentInstance,
      fixture,
      mockMealPlanner,
      mockRepo,
      getRecipePreviewRecipes() {
        return fixture.debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe);
      },
    };
  }
});
