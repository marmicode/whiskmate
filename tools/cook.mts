import { execSync } from 'child_process';
import enquirer from 'enquirer';
import { exercises, type Exercise } from './exercises.mts';
const { prompt } = enquirer;

const BRANCH_PREFIX = 'testing-';

async function main({
  gitAdapter = new GitAdapter(),
  promptAdapter = new PromptAdapter(),
}: { gitAdapter?: GitAdapter; promptAdapter?: PromptAdapter } = {}) {
  const currentExercise = maybeGetCurrentExercise({ gitAdapter });

  if (!currentExercise) {
    await goToExercise({ gitAdapter, promptAdapter });
    return;
  }

  const { command } = await promptAdapter.prompt<{ command: Command }>({
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
        message: 'Checkout the solution',
      },
    ] satisfies Array<{ name: Command; message: string }>,
  });

  switch (command) {
    case 'start':
      await goToExercise({ gitAdapter, promptAdapter });
      break;
    case 'checkout-impl':
      checkoutImplementation(currentExercise, { gitAdapter });
      break;
    case 'solution':
      await checkoutSolution(currentExercise, { gitAdapter, promptAdapter });
      break;
    default:
      console.error('Invalid choice');
      process.exit(1);
  }
}

type Command = 'start' | 'checkout-impl' | 'solution';

async function checkoutSolution(
  exercise: Exercise,
  {
    gitAdapter,
    promptAdapter,
  }: { gitAdapter: GitAdapter; promptAdapter: PromptAdapter },
  flavor?: string,
) {
  const branch = getSolutionBranch(exercise, flavor);
  await wipeout({ gitAdapter, promptAdapter });
  gitAdapter.executeGitCommand(`checkout origin/${branch} apps/whiskmate`);
}

async function goToExercise({
  gitAdapter,
  promptAdapter,
}: {
  gitAdapter: GitAdapter;
  promptAdapter: PromptAdapter;
}) {
  const exerciseChoice = await promptAdapter.prompt<{ exercise: string }>({
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
    const flavorChoice = await promptAdapter.prompt<{ flavor: string }>({
      type: 'autocomplete',
      name: 'flavor',
      message: 'Choose a flavor:',
      choices: selectedExercise.flavors,
    });
    flavor = flavorChoice.flavor;
  }

  let tdd = true;

  if (selectedExercise.implementationFiles) {
    const tddChoice = await promptAdapter.prompt<{ useTdd: boolean }>({
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

  await wipeout({ gitAdapter, promptAdapter });

  switchToBranch(`${BRANCH_PREFIX}${selectedExercise.id}-starter`, {
    gitAdapter,
  });

  checkoutImplementation(selectedExercise, { gitAdapter }, flavor ?? undefined);

  console.log('\n✅ Exercise setup complete!');
  console.log(
    `You are now on the ${BRANCH_PREFIX}${selectedExercise.id}-starter branch with the solution files.`,
  );
}

function checkoutImplementation(
  exercise: Exercise,
  { gitAdapter }: { gitAdapter: GitAdapter },
  flavor?: string,
) {
  console.log(`Checking out solution files...`);
  if (exercise.implementationFiles) {
    const filesToCheckout = exercise.implementationFiles.join(' ');

    const branch = flavor
      ? `${BRANCH_PREFIX}${exercise.id}-solution-${flavor}`
      : `${BRANCH_PREFIX}${exercise.id}-solution`;
    gitAdapter.executeGitCommand(
      `checkout origin/${branch} ${filesToCheckout}`,
    );
  }
}

function getSolutionBranch(exercise: Exercise, flavor?: string) {
  return flavor
    ? `${BRANCH_PREFIX}${exercise.id}-solution-${flavor}`
    : `${BRANCH_PREFIX}${exercise.id}-solution`;
}

function maybeGetCurrentExercise({
  gitAdapter,
}: {
  gitAdapter: GitAdapter;
}): Exercise | null {
  const currentBranch = gitAdapter.getCurrentBranch();
  if (!currentBranch.endsWith('-starter')) {
    return null;
  }
  const exerciseId = currentBranch
    .replace(BRANCH_PREFIX, '')
    .replace('-starter', '');

  return exercises.find((exercise) => exercise.id === exerciseId) ?? null;
}

function switchToBranch(
  branch: string,
  { gitAdapter }: { gitAdapter: GitAdapter },
) {
  console.log(`Switching to ${branch}...`);
  gitAdapter.executeGitCommand(`switch ${branch}`);
}

async function wipeout({
  gitAdapter,
  promptAdapter,
}: {
  gitAdapter: GitAdapter;
  promptAdapter: PromptAdapter;
}) {
  if (gitAdapter.hasLocalChanges()) {
    const confirmOverwrite = await promptAdapter.prompt<{ confirm: boolean }>({
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
  gitAdapter.executeGitCommand('reset --hard');

  console.log('Cleaning untracked files...');
  gitAdapter.executeGitCommand('clean -df');
}

class GitAdapter {
  executeGitCommand(command: string) {
    execSync(`git ${command}`, { stdio: 'inherit' });
  }

  getCurrentBranch() {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  }

  hasLocalChanges() {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim().length > 0;
  }
}

class PromptAdapter {
  prompt<T>(
    ...args: Parameters<typeof prompt<T>>
  ): ReturnType<typeof prompt<T>> {
    return prompt(...args);
  }
}

main();
