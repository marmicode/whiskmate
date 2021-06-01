import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable, EMPTY } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';
import {
  RecipeSearchComponent,
  RecipeSearchModule,
} from './recipe-search.component';
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

  let mockRepo: jest.Mocked<Pick<RecipeRepository, 'search'>>;
  beforeEach(() => (mockRepo = { search: jest.fn() }));

  it('should search recipes without keyword on load', async () => {
    mockRepo.search.mockReturnValue(of([papperdelle, puyLentil]));

    const { harness } = await createComponent();

    expect(await harness.getRecipeNames()).toEqual([
      'Pappardelle with rose harissa, black olives and capers',
      'Puy lentil and aubergine stew',
    ]);
    expect(mockRepo.search).toBeCalledTimes(1);
    expect(mockRepo.search).toBeCalledWith({});
  });

  async function createComponent() {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RecipeSearchModule],
      providers: [
        {
          provide: RecipeRepository,
          useValue: mockRepo,
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeSearchComponent);

    return {
      component: fixture.componentInstance,
      fixture,
      harness: await TestbedHarnessEnvironment.harnessForFixture(
        fixture,
        RecipeSearchHarness
      ),
    };
  }
});
