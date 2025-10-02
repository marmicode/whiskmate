import { type Config, type Exercise } from './core.ts';

const files = {
  mealPlanner: 'src/app/meal-planner/meal-planner.ts',
  mealRepository: 'src/app/meal-planner/meal-repository.ts',
  recipeFilter: 'src/app/recipe/recipe-filter.ng.ts',
  recipeSearch: 'src/app/recipe/recipe-search.ng.ts',
};

const exercises: Exercise[] = [
  {
    id: '101-meal-planner',
    name: '101 - Meal Planner',
    implementationFiles: [files.mealPlanner],
  },
  {
    id: '102-meal-planner-reactive',
    name: '102 - Meal Planner Reactive',
    implementationFiles: [files.mealPlanner],
  },
  {
    id: '201-meal-planner-indirect-output',
    name: '201 - Meal Planner Indirect Output',
    implementationFiles: [files.mealPlanner],
  },
  {
    id: '202-meal-planner-indirect-input',
    name: '202 - Meal Planner Indirect Input',
    implementationFiles: [files.mealPlanner],
  },
  {
    id: '203-meal-repository',
    name: '203 - Meal Repository',
    implementationFiles: [files.mealRepository],
  },
  {
    id: '204-meal-repository-contract',
    name: '204 - Meal Repository Contract',
  },
  {
    id: '301-recipe-search-isolated',
    name: '301 - Recipe Search Isolated',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '302-recipe-search-integration-test-bed',
    name: '302 - Recipe Search Integration (TestBed)',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '302-recipe-search-integration-testing-library',
    name: '302 - Recipe Search Integration (Testing Library)',
  },
  {
    id: '303-recipe-search-shallow-test-bed',
    name: '303 - Recipe Search Shallow (TestBed)',
  },
  {
    id: '303-recipe-search-shallow-testing-library',
    name: '303 - Recipe Search Shallow (Testing Library)',
  },
  {
    id: '304-recipe-search-async-pipe',
    name: '304 - Recipe Search Async Pipe',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '305-recipe-search-signals',
    name: '305 - Recipe Search Signals',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '401-recipe-filter',
    name: '401 - Recipe Filter',
    implementationFiles: [files.recipeFilter],
  },
  {
    id: '402-recipe-search-filter-interaction',
    name: '402 - Recipe Search & Filter Interaction',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '403-recipe-search-add-button',
    name: '403 - Recipe Search Add Button',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '404-recipe-filter-material',
    name: '404 - Recipe Filter Material',
    implementationFiles: [files.recipeFilter],
  },
  {
    id: '501-recipe-preview-ct',
    name: '501 - Recipe Preview Playwright Component Testing',
  },
  {
    id: '502-recipe-filter-ct',
    name: '502 - Recipe Filter Playwright Component Testing',
  },
  {
    id: '503-recipe-search-ct',
    name: '503 - Recipe Search Playwright Component Testing',
  },
  {
    id: '504-playwright-visual-regression-testing',
    name: '504 - Playwright Visual Regression Testing',
  },
];

export const config: Config = {
  base: 'pragmatic-angular-testing',
  exercises,
};
