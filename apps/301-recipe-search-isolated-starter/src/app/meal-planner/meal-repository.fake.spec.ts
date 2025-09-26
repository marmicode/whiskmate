import { MealRepositoryFake } from './meal-repository.fake';
import { verifyMealRepositoryContract } from './meal-repository.contract';
import { TestBed } from '@angular/core/testing';

describe(MealRepositoryFake.name, () => {
  verifyMealRepositoryContract(createMealRepositoryFake);

  function createMealRepositoryFake() {
    return { mealRepo: TestBed.inject(MealRepositoryFake) };
  }
});
