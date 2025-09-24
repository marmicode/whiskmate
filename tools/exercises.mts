const files = {
  mealPlanner: 'apps/whiskmate/src/app/meal-planner/meal-planner.ts',
  recipeFilter: 'apps/whiskmate/src/app/recipe/recipe-filter.ng.ts',
  recipeSearch: 'apps/whiskmate/src/app/recipe/recipe-search.ng.ts',
};

export const exercises: Exercise[] = [
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
    id: '301-recipe-search-isolated',
    name: '301 - Recipe Search Isolated',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '302-recipe-search-integration',
    name: '302 - Recipe Search Integration',
    flavors: ['test-bed', 'testing-library'],
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '303-recipe-search-shallow',
    name: '303 - Recipe Search Shallow',
    flavors: ['test-bed', 'testing-library'],
    implementationFiles: [files.recipeSearch],
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
    id: '402-recipe-filter-interaction',
    name: '402 - Recipe Filter Interaction',
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
    id: 'testing-504-playwright-visual-regression-testing',
    name: '504 - Playwright Visual Regression Testing',
  },
];

export interface Exercise {
  id: string;
  name: string;
  implementationFiles?: string[];
  flavors?: string[];
}
