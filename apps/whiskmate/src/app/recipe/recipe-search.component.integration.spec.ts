import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeSearchHarness } from './recipe-search.harness';
import { Recipe } from './recipe';

describe(RecipeSearchComponent.name, () => {
  const papperdelle = {
    id: 'papperdelle-with-rose-harissa',
    name: 'Pappardelle with rose harissa, black olives and capers',
  } as Recipe;
  const puyLentil = {
    id: 'puy-lentil-and-aubergine-stew',
    name: 'Puy lentil and aubergine stew',
  } as Recipe;

  it('should search recipes without filtering', async () => {
    const { mockRepo, render } = await createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle, puyLentil]));

    const { harness } = await render();

    expect(await harness.getRecipeNames()).toEqual([
      'Pappardelle with rose harissa, black olives and capers',
      'Puy lentil and aubergine stew',
    ]);
    expect(mockRepo.search).toBeCalledTimes(1);
    expect(mockRepo.search).toBeCalledWith({});
  });

  function createComponent() {
    const mockRepo = { search: jest.fn() } as jest.Mocked<
      Pick<RecipeRepository, 'search'>
    >;

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        {
          provide: RecipeRepository,
          useValue: mockRepo,
        },
      ],
    });

    let fixture: ComponentFixture<RecipeSearchComponent>;

    return {
      mockRepo,
      async render() {
        fixture = TestBed.createComponent(RecipeSearchComponent);
        fixture.detectChanges();
        const harness = await TestbedHarnessEnvironment.harnessForFixture(
          fixture,
          RecipeSearchHarness
        );
        return { harness };
      },
    };
  }
});
