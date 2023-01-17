import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../recipe/recipe';
import { MealRepositoryDef } from './meal-repository.service';

@Injectable({
  providedIn: 'root',
})
export class MealRepositoryFake implements MealRepositoryDef {
  addMeal(recipe: Recipe): Observable<void> {
    throw new Error('🚧 work in progress!');
  }

  getMeals(): Observable<Recipe[]> {
    throw new Error('🚧 work in progress!');
  }

  getMealsSync(): Recipe[] {
    throw new Error('🚧 work in progress!');
  }
}
