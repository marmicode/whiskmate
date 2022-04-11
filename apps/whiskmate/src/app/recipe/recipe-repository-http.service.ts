import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepositoryHttp implements Pick<RecipeRepository, 'search'> {
  private _baseUrl = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient) {}

  addRecipe(recipe: Pick<Recipe, 'name'>): Observable<Recipe> {
    return this._httpClient
      .post<RemoteRecipe>(`${this._baseUrl}/recipes`, recipe)
      .pipe(map((data) => this._toRecipe(data)));
  }

  search(): Observable<Recipe[]> {
    return this._httpClient
      .get<{ items: RemoteRecipe[] }>(`${this._baseUrl}/recipes`)
      .pipe(
        map((data) => {
          return data.items.map((item) => this._toRecipe(item));
        })
      );
  }

  private _toRecipe(data: RemoteRecipe): Recipe {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      pictureUri: data.picture_uri,
      steps: [],
      ingredients: [],
    };
  }
}

interface RemoteRecipe {
  id: string;
  name: string;
  description: string;
  picture_uri: string;
}
