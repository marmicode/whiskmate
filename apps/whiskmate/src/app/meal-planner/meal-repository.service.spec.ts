import { MealRepository } from './meal-repository.service';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { recipeMother } from '../testing/recipe.mother';
import { LocalStorage } from '../shared/local-storage';
import { provideLocalStorageFake } from '../shared/local-storage.fake';

describe(MealRepository.name, () => {
  const burger = recipeMother.withBasicInfo('Burger').build();
  const salad = recipeMother.withBasicInfo('Salad').build();

  it('should add recipe', async () => {
    const { mealRepo } = createMealRepository();

    await lastValueFrom(mealRepo.addMeal(burger));
    await lastValueFrom(mealRepo.addMeal(salad));

    expect(await lastValueFrom(mealRepo.getMeals())).toEqual([
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });

  it('should return empty array when storage is empty', async () => {
    const { mealRepo } = createMealRepository();

    expect(await lastValueFrom(mealRepo.getMeals())).toEqual([]);
  });

  it('should return empty array when storage value is invalid', async () => {
    const { getMealRepo, setStorageValue } = setUpMealRepository();

    setStorageValue('invalid-value');

    /* Instantiate the repository once the storage is set up. */
    const mealRepo = getMealRepo();

    expect(await lastValueFrom(mealRepo.getMeals())).toEqual([]);
  });

  function createMealRepository() {
    const { getMealRepo, ...utils } = setUpMealRepository();
    return {
      ...utils,
      mealRepo: getMealRepo(),
    };
  }

  function setUpMealRepository() {
    TestBed.configureTestingModule({
      providers: [provideLocalStorageFake()],
    });

    return {
      getMealRepo() {
        return TestBed.inject(MealRepository);
      },
      setStorageValue(value: string) {
        TestBed.inject(LocalStorage).setItem('meals', value);
      },
    };
  }
});
