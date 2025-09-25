import { execSync } from 'child_process';
import enquirer from 'enquirer';
import { fileURLToPath } from 'node:url';
import { exercises, type Exercise } from './exercises.mts';
const { prompt } = enquirer;

const BRANCH_PREFIX = 'testing-';

export async function main({
  gitAdapter = new GitAdapter(),
  promptAdapter = new PromptAdapter(),
}: { gitAdapter?: GitAdapter; promptAdapter?: PromptAdapter } = {}) {
  const exercise = maybeGetCurrentExercise({ gitAdapter });

  if (!exercise) {
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
      checkoutImplementation({
        exercise,
        flavor: await maybeSelectFlavor({
          exercise,
          promptAdapter,
        }),
        gitAdapter,
      });
      break;
    case 'solution':
      await checkoutSolution({
        exercise,
        flavor: await maybeSelectFlavor({
          exercise,
          promptAdapter,
        }),
        gitAdapter,
        promptAdapter,
      });
      break;
    default:
      console.error('Invalid choice');
      process.exit(1);
  }
}

type Command = 'start' | 'checkout-impl' | 'solution';

export async function checkoutSolution({
  exercise,
  gitAdapter,
  promptAdapter,
  flavor,
}: {
  exercise: Exercise;
  gitAdapter: GitAdapter;
  promptAdapter: PromptAdapter;
  flavor: string | null;
}) {
  const branch = getSolutionBranch({ exercise, flavor });
  await wipeout({ gitAdapter, promptAdapter });
  gitAdapter.executeGitCommand(`checkout origin/${branch} apps/whiskmate`);
}

export async function goToExercise({
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

  const flavor = await maybeSelectFlavor({
    exercise: selectedExercise,
    promptAdapter,
  });

  let tdd = true;

  if (selectedExercise.implementationFiles) {
    const tddChoice = await promptAdapter.prompt<{ useTdd: boolean }>({
      type: 'confirm',
      name: 'useTdd',
      message: 'Do you want to use TDD?',
      initial: true,
    });
    tdd = tddChoice.useTdd;
  }

  console.log(`\nSetting up exercise: ${selectedExercise.name}`);
  console.log(`TDD mode: ${tdd ? 'Yes' : 'No'}`);
  console.log('Running git commands...\n');

  await wipeout({ gitAdapter, promptAdapter });

  switchToBranch({
    branch: `${BRANCH_PREFIX}${selectedExercise.id}-starter`,
    gitAdapter,
  });

  if (!tdd) {
    checkoutImplementation({
      exercise: selectedExercise,
      gitAdapter,
      flavor,
    });
  }

  console.log('\n✅ Exercise setup complete!');
  console.log(
    `You are now on the ${BRANCH_PREFIX}${selectedExercise.id}-starter branch with the solution files.`,
  );
}

export function checkoutImplementation({
  exercise,
  gitAdapter,
  flavor,
}: {
  exercise: Exercise;
  gitAdapter: GitAdapter;
  flavor: string | null;
}) {
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

function getSolutionBranch({
  exercise,
  flavor,
}: {
  exercise: Exercise;
  flavor: string | null;
}) {
  return flavor
    ? `${BRANCH_PREFIX}${exercise.id}-solution-${flavor}`
    : `${BRANCH_PREFIX}${exercise.id}-solution`;
}

export function maybeGetCurrentExercise({
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

async function maybeSelectFlavor({
  exercise,
  promptAdapter,
}: {
  exercise: Exercise;
  promptAdapter: PromptAdapter;
}) {
  if (exercise.flavors) {
    const flavorChoice = await promptAdapter.prompt<{ flavor: string }>({
      type: 'autocomplete',
      name: 'flavor',
      message: 'Choose a flavor:',
      choices: exercise.flavors,
    });
    return flavorChoice.flavor;
  }

  return null;
}

function switchToBranch({
  branch,
  gitAdapter,
}: {
  branch: string;
  gitAdapter: GitAdapter;
}) {
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
  if (!gitAdapter.hasLocalChanges()) {
    return;
  }

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

  console.log('Resetting to clean state...');
  gitAdapter.executeGitCommand('reset --hard');

  console.log('Cleaning untracked files...');
  gitAdapter.executeGitCommand('clean -df');
}

export class GitAdapter {
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

export class PromptAdapter {
  prompt<T>(
    ...args: Parameters<typeof prompt<T>>
  ): ReturnType<typeof prompt<T>> {
    return prompt(...args);
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main();
}
