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

  let mockMealPlanner: jest.Mocked<
    Pick<MealPlanner, 'addRecipe' | 'watchCanAddRecipe'>
  >;
  beforeEach(
    () =>
      (mockMealPlanner = { addRecipe: jest.fn(), watchCanAddRecipe: jest.fn() })
  );

  let mockRepo: jest.Mocked<Pick<RecipeRepository, 'search'>>;
  beforeEach(() => (mockRepo = { search: jest.fn() }));

  it('should search recipes without keyword on load', async () => {
    mockRepo.search.mockReturnValue(of([papperdelle, puyLentil]));

    const { getRecipePreviewRecipes } = await createComponent();

    expect(await getRecipePreviewRecipes()).toEqual([papperdelle, puyLentil]);

    expect(mockRepo.search).toBeCalledTimes(1);
    expect(mockRepo.search).toBeCalledWith({});
  });

  it('should search recipes using given filter', async () => {
    mockRepo.search.mockReturnValue(of([papperdelle]));
    const { fixture, getRecipePreviewRecipes } = await createComponent();

    fixture.debugElement
      .query(By.css('wm-recipe-filter'))
      .triggerEventHandler('filterChange', {
        keywords: 'Papperdelle',
        maxIngredientCount: 3,
      } as RecipeFilter);
    expect(await getRecipePreviewRecipes()).toEqual([papperdelle]);

    expect(mockRepo.search).toBeCalledTimes(2);
    expect(mockRepo.search).lastCalledWith({
      keywords: 'Papperdelle',
      maxIngredientCount: 3,
    } as RecipeFilter);
  });

  it('should add recipe to meal planner', async () => {
    mockRepo.search.mockReturnValue(of([papperdelle]));
    const { harness } = await createComponent();

    const button = await harness.getFirstRecipeAddButton();
    await button.click();

    expect(mockMealPlanner.addRecipe).toBeCalledTimes(1);
    expect(mockMealPlanner.addRecipe).toBeCalledWith(papperdelle);
  });

  it("should disable add button if can't add", async () => {
    mockRepo.search.mockReturnValue(of([papperdelle]));
    mockMealPlanner.watchCanAddRecipe.mockReturnValue(of(false));

    const { harness } = await createComponent();

    const button = await harness.getFirstRecipeAddButton();

    expect(await button.isDisabled()).toBe(true);
    expect(mockMealPlanner.watchCanAddRecipe).toBeCalledTimes(1);
    expect(mockMealPlanner.watchCanAddRecipe).toBeCalledWith(papperdelle);
  });

  async function createComponent() {
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

    const harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      RecipeSearchHarness
    );

    return {
      component: fixture.componentInstance,
      fixture,
      harness,
      async getRecipePreviewRecipes(): Promise<Recipe[]> {
        const harnesses = await harness.getRecipePreviews();
        return Promise.all(
          harnesses.map((harness) =>
            harness.host().then((host) => host.getProperty('recipe'))
          )
        );
      },
    };
  }
});
