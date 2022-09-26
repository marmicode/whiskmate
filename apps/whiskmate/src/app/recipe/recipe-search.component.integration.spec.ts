import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { readFileSync } from 'fs';
import { join } from 'path';
import { of } from 'rxjs';
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

  beforeEach(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = readFileSync(
      join(__dirname, '../../styles.css'),
      'utf-8'
    );
    document.head.appendChild(styleEl);
  });

  it('should search recipes without keyword on load', async () => {
    const { mockRepo, render } = await createComponent();

    mockRepo.search.mockReturnValue(of([papperdelle, puyLentil]));

    const { harness } = await render();

    expect(screen.getAllByText('ADD')[0]).toBeVisible();

    expect(await harness.getRecipeNames()).toEqual([
      'Pappardelle with rose harissa, black olives and capers',
      'Puy lentil and aubergine stew',
    ]);
    expect(mockRepo.search).toBeCalledTimes(1);
    expect(mockRepo.search).toBeCalledWith({});
  });

  async function createComponent() {
    const mockRepo = { search: jest.fn() } as jest.Mocked<
      Pick<RecipeRepository, 'search'>
    >;

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RecipeSearchModule],
      providers: [
        {
          provide: RecipeRepository,
          useValue: mockRepo,
        },
      ],
    }).compileComponents();

    let fixture: ComponentFixture<RecipeSearchComponent>;

    return {
      mockRepo,
      async render() {
        fixture = TestBed.createComponent(RecipeSearchComponent);
        fixture.detectChanges();
        console.log(document.head.innerHTML);

        const harness = await TestbedHarnessEnvironment.harnessForFixture(
          fixture,
          RecipeSearchHarness
        );
        return { harness };
      },
    };
  }
});
