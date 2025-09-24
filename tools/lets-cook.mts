import { execSync } from 'child_process';
import enquirer from 'enquirer';
import { exercises, type Exercise } from './exercises.mts';
const { prompt } = enquirer;

const BRANCH_PREFIX = 'testing-';

main();

async function main() {
  const currentExercise = maybeGetCurrentExercise();

  if (!currentExercise) {
    goToExercise();
    return;
  }

  const { command } = await prompt<{ command: Command }>({
    type: 'autocomplete',
    name: 'command',
    message: 'Choose an option:',
    choices: [
      {
        name: 'start',
        message: 'Start a new exercise',
      },
      {
        name: 'checkout-impl',
        message: 'Checkout the implementation',
      },
      {
        name: 'solution',
        message: 'Show solution',
      },
    ] satisfies Array<{ name: Command; message: string }>,
  });

  switch (command) {
    case 'start':
      await goToExercise();
      break;
    case 'checkout-impl':
      checkoutImplementation(currentExercise);
      break;
    case 'solution':
      await goToSolution(currentExercise);
      break;
    default:
      console.error('Invalid choice');
      process.exit(1);
  }
}

type Command = 'start' | 'checkout-impl' | 'solution';

async function goToSolution(exercise: Exercise, flavor?: string) {
  const branch = getSolutionBranch(exercise, flavor);
  await wipeout();
  switchToBranch(branch);
}

async function goToExercise() {
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

  console.log(`\nSetting up exercise: ${selectedExercise.name}`);
  console.log(`TDD mode: ${tdd ? 'Yes' : 'No'}`);
  console.log('Running git commands...\n');

  await wipeout();

  switchToBranch(`${BRANCH_PREFIX}${selectedExercise.id}-starter`);

  checkoutImplementation(selectedExercise);

  console.log('\n✅ Exercise setup complete!');
  console.log(
    `You are now on the ${BRANCH_PREFIX}${selectedExercise.id}-starter branch with the solution files.`,
  );
}

function checkoutImplementation(exercise: Exercise, flavor?: string) {
  console.log(`Checking out solution files...`);
  if (exercise.implementationFiles) {
    const filesToCheckout = exercise.implementationFiles.join(' ');

    const branch = flavor
      ? `${BRANCH_PREFIX}${exercise.id}-solution-${flavor}`
      : `${BRANCH_PREFIX}${exercise.id}-solution`;
    executeGitCommand(`checkout origin/${branch} ${filesToCheckout}`);
  }
}

function getSolutionBranch(exercise: Exercise, flavor?: string) {
  return flavor
    ? `${BRANCH_PREFIX}${exercise.id}-solution-${flavor}`
    : `${BRANCH_PREFIX}${exercise.id}-solution`;
}

function hasLocalChanges(): boolean {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  return status.trim().length > 0;
}

function maybeGetCurrentExercise(): Exercise | null {
  const currentBranch = getCurrentBranch();
  if (!currentBranch.endsWith('-starter')) {
    return null;
  }
  const exerciseId = currentBranch
    .replace(BRANCH_PREFIX, '')
    .replace('-starter', '');

  return exercises.find((exercise) => exercise.id === exerciseId) ?? null;
}

function getCurrentBranch() {
  return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
}

function switchToBranch(branch: string) {
  console.log(`Switching to ${branch}...`);
  executeGitCommand(`switch ${branch}`);
}

async function wipeout() {
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

  console.log('Resetting to clean state...');
  executeGitCommand('reset --hard');

  console.log('Cleaning untracked files...');
  executeGitCommand('clean -df');
}

function executeGitCommand(command: string) {
  execSync(`git ${command}`, { stdio: 'inherit' });
}
