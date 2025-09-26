import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe/recipe';
import { MealRepository, MealRepositoryDef } from './meal-repository.service';

@Injectable({
  providedIn: 'root',
})
export class MealRepositoryFake implements MealRepositoryDef {
  addMeal(meal: Recipe): Observable<void> {
    throw new Error('🚧 work in progress!');
  }

  getMeals(): Observable<Recipe[]> {
    throw new Error('🚧 work in progress!');
  }

  getMealsSync(): Recipe[] {
    throw new Error('🚧 work in progress!');
  }
}

export function provideMealRepositoryFake(): Provider[] {
  return [
    MealRepositoryFake,
    {
      provide: MealRepository,
      useExisting: MealRepositoryFake,
    },
  ];
}
