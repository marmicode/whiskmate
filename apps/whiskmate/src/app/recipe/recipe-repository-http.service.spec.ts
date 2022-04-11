import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { RecipeRepositoryHttp } from './recipe-repository-http.service';

describe(RecipeRepositoryHttp.name, () => {
  it('should fetch recipes', async () => {
    const { repo } = createRepo();

    const recipes = await lastValueFrom(repo.search());

    expect(recipes.length).toBeGreaterThan(0);
    expect(recipes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: 'Burger',
          ingredients: [],
          steps: [],
        }),
      ])
    );
  });

  function createRepo() {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    const repo = TestBed.inject(RecipeRepositoryHttp);
    return { repo };
  }
});
