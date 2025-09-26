import { TestBed } from '@angular/core/testing';
import { MealPlanner } from './meal-planner';

describe(MealPlanner.name, () => {
  it.todo('should add recipe', () => {
    const { mealPlanner } = createMealPlanner();

    throw new Error('🚧 work in progress!');
  });

  it.todo('...');

  function createMealPlanner() {
    return {
      mealPlanner: TestBed.inject(MealPlanner),
    };
  }
});
