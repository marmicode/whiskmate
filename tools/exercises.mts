export const exercises: Exercise[] = [
  {
    id: '101-meal-planner',
    name: '101 - Meal Planner',
    implementationFiles: [
      'apps/whiskmate/src/app/meal-planner/meal-planner.ts',
    ],
  },
  {
    id: '102-meal-planner-reactive',
    name: '102 - Meal Planner Reactive',
    implementationFiles: [
      'apps/whiskmate/src/app/meal-planner/meal-planner.ts',
    ],
  },
  {
    id: '201-meal-planner-indirect-output',
    name: '201 - Meal Planner Indirect Output',
    implementationFiles: [
      'apps/whiskmate/src/app/meal-planner/meal-planner.ts',
    ],
  },
  {
    id: '202-meal-planner-indirect-input',
    name: '202 - Meal Planner Indirect Input',
    implementationFiles: [
      'apps/whiskmate/src/app/meal-planner/meal-planner.ts',
    ],
  },
  {
    id: '301-recipe-search-isolated',
    name: '301 - Recipe Search Isolated',
    implementationFiles: [
      'apps/whiskmate/src/app/recipe-search/recipe-search.ng.ts',
    ],
  },
  {
    id: '302-recipe-search-integration',
    name: '302 - Recipe Search Integration',
    flavors: ['test-bed', 'testing-library'],
    implementationFiles: [
      'apps/whiskmate/src/app/recipe-search/recipe-search.ng.ts',
    ],
  },
  {
    id: '303-recipe-search-shallow',
    name: '303 - Recipe Search Shallow',
    flavors: ['test-bed', 'testing-library'],
    implementationFiles: [
      'apps/whiskmate/src/app/recipe-search/recipe-search.ng.ts',
    ],
  },
  {
    id: '304-recipe-search-async-pipe',
    name: '304 - Recipe Search Async Pipe',
    implementationFiles: [
      'apps/whiskmate/src/app/recipe-search/recipe-search.ng.ts',
    ],
  },
  {
    id: '305-recipe-search-signals',
    name: '305 - Recipe Search Signals',
    implementationFiles: [
      'apps/whiskmate/src/app/recipe-search/recipe-search.ng.ts',
    ],
  },
  {
    id: '401-recipe-filter',
    name: '401 - Recipe Filter',
    implementationFiles: [
      'apps/whiskmate/src/app/recipe-filter/recipe-filter.ng.ts',
    ],
  },
  {
    id: '402-recipe-filter-interaction',
    name: '402 - Recipe Filter Interaction',
    implementationFiles: [
      'apps/whiskmate/src/app/recipe-filter/recipe-filter.ng.ts',
    ],
  },
  {
    id: '501-recipe-preview-ct',
    name: '501 - Recipe Preview Playwright Component Testing',
    implementationFiles: [],
  },
  {
    id: '502-recipe-filter-ct',
    name: '502 - Recipe Filter Playwright Component Testing',
    implementationFiles: [],
  },
  {
    id: '503-recipe-search-ct',
    name: '503 - Recipe Search Playwright Component Testing',
    implementationFiles: [],
  },
  {
    id: 'testing-504-playwright-visual-regression-testing',
    name: '504 - Playwright Visual Regression Testing',
    implementationFiles: [],
  },
];
interface Exercise {
  id: string;
  name: string;
  implementationFiles?: string[];
  flavors?: string[];
}
