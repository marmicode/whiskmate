import enquirer from 'enquirer';
import { execSync } from 'child_process';
const { prompt } = enquirer;

main();

async function main() {
  const exerciseChoice = await prompt<{ exercise: string }>({
    type: 'autocomplete',
    name: 'exercise',
    message: 'Choose an exercise:',
    choices: exercises.map((exercise) => ({
      name: exercise.id,
      message: exercise.name,
    })),
  });

  const selectedExercise = exercises.find(
    (ex) => ex.id === exerciseChoice.exercise,
  );
  if (!selectedExercise) {
    console.error('Selected exercise not found');
    process.exit(1);
  }

  let flavor: string | null = null;
  if (selectedExercise.flavors) {
    const flavorChoice = await prompt<{ flavor: string }>({
      type: 'autocomplete',
      name: 'flavor',
      message: 'Choose a flavor:',
      choices: selectedExercise.flavors,
    });
    flavor = flavorChoice.flavor;
  }

  let tdd = true;

  if (selectedExercise.implementationFiles) {
    const tddChoice = await prompt<{ useTdd: boolean }>({
      type: 'confirm',
      name: 'useTdd',
      message: 'Do you want to use TDD or checkout the implementation first?',
      initial: true,
    });
    tdd = tddChoice.useTdd;
  }

  if (hasLocalChanges()) {
    const confirmOverwrite = await prompt<{ confirm: boolean }>({
      type: 'confirm',
      name: 'confirm',
      message:
        'You have local changes (including untracked files). This will overwrite all your local changes. Continue?',
      initial: true,
    });

    if (!confirmOverwrite.confirm) {
      console.log('Operation cancelled.');
      process.exit(0);
    }
  }

  console.log(`\nSetting up exercise: ${selectedExercise.name}`);
  console.log(`TDD mode: ${tdd ? 'Yes' : 'No'}`);
  console.log('Running git commands...\n');

  console.log('Resetting to clean state...');
  executeGitCommand('reset --hard');

  console.log('Cleaning untracked files...');
  executeGitCommand('clean -df');

  console.log(`Switching to testing-${selectedExercise.id}-starter...`);
  executeGitCommand(`switch testing-${selectedExercise.id}-starter`);

  console.log(`Checking out solution files...`);
  if (selectedExercise.implementationFiles) {
    const filesToCheckout = selectedExercise.implementationFiles.join(' ');

    const branch = flavor
      ? `testing-${selectedExercise.id}-solution-${flavor}`
      : `testing-${selectedExercise.id}-solution`;
    executeGitCommand(`checkout origin/${branch} ${filesToCheckout}`);
  }

  console.log('\n✅ Exercise setup complete!');
  console.log(
    `You are now on the testing-${selectedExercise.id}-starter branch with the solution files.`,
  );
}

function hasLocalChanges(): boolean {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  return status.trim().length > 0;
}

function executeGitCommand(command: string) {
  execSync(`git ${command}`, { stdio: 'inherit' });
}

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
