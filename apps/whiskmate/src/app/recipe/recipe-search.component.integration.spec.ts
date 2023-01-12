import { RecipeRepository } from './recipe-repository.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeSearchComponent } from './recipe-search.component';
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

  it.todo('🚧 should search recipes without filtering');

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

    let fixture: ComponentFixture<RecipeSearchComponent>;

    return {
      mockRepo,
      render() {
        fixture = TestBed.createComponent(RecipeSearchComponent);
        fixture.detectChanges();
      },
    };
  }
});
