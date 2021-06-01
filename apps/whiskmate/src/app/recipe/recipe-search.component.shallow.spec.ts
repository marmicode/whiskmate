import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MealPlanner } from './../meal-planner/meal-planner.service';
import { Recipe } from './recipe';
import { RecipeFilter } from './recipe-filter';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeSearchHarness } from './recipe-search.harness';

describe(RecipeSearchComponent.name, () => {
  const papperdelle = {
    id: 'papperdelle-with-rose-harissa',
    name: 'Pappardelle with rose harissa, black olives and capers',
  } as Recipe;
  const puyLentil = {
    id: 'puy-lentil-and-aubergine-stew',
    name: 'Puy lentil and aubergine stew',
  } as Recipe;

  let mockSearch: jest.MockedFunction<typeof RecipeRepository.prototype.search>;
  beforeEach(() => (mockSearch = jest.fn()));

  let mockWatchCanAddRecipe: jest.MockedFunction<
    typeof MealPlanner.prototype.watchCanAddRecipe
  >;
  beforeEach(() => (mockWatchCanAddRecipe = jest.fn()));

  it('should search recipes without keyword on load', async () => {
    mockSearch.mockReturnValue(of([papperdelle, puyLentil]));

    const { getRecipePreviewRecipes } = await createComponent();

    expect(await getRecipePreviewRecipes()).toEqual([papperdelle, puyLentil]);

    expect(mockSearch).toBeCalledTimes(1);
    expect(mockSearch).toBeCalledWith({});
  });

  it('should search recipes using given filter', async () => {
    mockSearch.mockReturnValue(of([papperdelle]));
    const { fixture, getRecipePreviewRecipes } = await createComponent();

    fixture.debugElement
      .query(By.css('wm-recipe-filter'))
      .triggerEventHandler('filterChange', {
        keywords: 'Papperdelle',
        maxIngredientCount: 3,
      } as RecipeFilter);
    expect(await getRecipePreviewRecipes()).toEqual([papperdelle]);

    expect(mockSearch).toBeCalledTimes(2);
    expect(mockSearch).lastCalledWith({
      keywords: 'Papperdelle',
      maxIngredientCount: 3,
    } as RecipeFilter);
  });

  it('should add recipe to meal planner', async () => {
    mockSearch.mockReturnValue(of([papperdelle]));
    const { harness, mockAddRecipe } = await createComponent();

    const button = await harness.getFirstRecipeAddButton();
    await button.click();

    expect(mockAddRecipe).toBeCalledTimes(1);
    expect(mockAddRecipe).toBeCalledWith(papperdelle);
  });

  it("should disable add button if can't add", async () => {
    mockSearch.mockReturnValue(of([papperdelle]));
    mockWatchCanAddRecipe.mockReturnValue(of(false));

    const { harness } = await createComponent();

    const button = await harness.getFirstRecipeAddButton();

    expect(await button.isDisabled()).toBe(true);
    expect(mockWatchCanAddRecipe).toBeCalledTimes(1);
    expect(mockWatchCanAddRecipe).toBeCalledWith(papperdelle);
  });

  async function createComponent() {
    const mockAddRecipe = jest.fn() as jest.MockedFunction<
      typeof MealPlanner.prototype.addRecipe
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
          } as Partial<RecipeRepository>,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeSearchComponent);

    const harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      RecipeSearchHarness
    );

    return {
      component: fixture.componentInstance,
      fixture,
      async getRecipePreviewRecipes(): Promise<Recipe[]> {
        const harnesses = await harness.getRecipePreviews();
        return Promise.all(
          harnesses.map((harness) =>
            harness.host().then((host) => host.getProperty('recipe'))
          )
        );
      },
      harness,
      mockAddRecipe,
    };
  }
});
