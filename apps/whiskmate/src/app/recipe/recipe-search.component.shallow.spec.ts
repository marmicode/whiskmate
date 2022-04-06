import { MealPlanner } from './../meal-planner/meal-planner.service';
import { RecipeFilter } from './recipe-filter';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
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
    const { mockRepo, render, getDisplayedRecipes } = await createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle, puyLentil]));

    await render();

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

  it('should add recipe to meal planner', async () => {
    const {
      mockMealPlanner,
      mockRepo,
      getFirstAddButton,
      render,
    } = await createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle]));

    await render();

    getFirstAddButton().click();

    expect(mockMealPlanner.addRecipe).toBeCalledTimes(1);
    expect(mockMealPlanner.addRecipe).toBeCalledWith(papperdelle);
  });

  it("should disable add button if can't add", async () => {
    const {
      mockMealPlanner,
      mockRepo,
      getFirstAddButton,
      render,
    } = await createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle]));
    mockMealPlanner.watchCanAddRecipe.mockReturnValue(of(false));

    await render();

    expect(getFirstAddButton().isDisabled()).toBe(true);
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

    let fixture: ComponentFixture<RecipeSearchComponent>;

    return {
      mockMealPlanner,
      mockRepo,
      async render() {
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

        fixture = TestBed.createComponent(RecipeSearchComponent);

        fixture.detectChanges();
      },
      getFirstAddButton() {
        const el = fixture.debugElement.query(By.css('[data-role=add-recipe]'));
        return {
          click: () => el.triggerEventHandler('click', {}),
          isDisabled: () => el.properties.disabled,
        };
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
