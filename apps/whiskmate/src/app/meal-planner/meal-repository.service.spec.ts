import { MealRepository } from './meal-repository.service';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { recipeMother } from '../testing/recipe.mother';
import { LocalStorage } from '../shared/local-storage';
import { LocalStorageFake } from '../shared/local-storage.fake';

describe(MealRepository.name, () => {
  const burger = recipeMother.withBasicInfo('Burger').build();
  const salad = recipeMother.withBasicInfo('Salad').build();

  it.todo('🚧 should add recipe');

  it.todo('🚧 should return empty array when storage is empty');

  it.todo('🚧 should return empty array when storage value is invalid');

  function createMealRepository() {
    const mealRepo = TestBed.inject(MealRepository);

    return {
      mealRepo,
      setStorageValue(value: string) {
        // @todo
      },
    };
  }
});
