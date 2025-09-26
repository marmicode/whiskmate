import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.ts';
import { type Config, type Exercise } from './core.ts';
import {
  CommandRunner,
  FileSystemAdapter,
  GitAdapter,
  PromptAdapter,
} from './infra.ts';

const STARTER_SUFFIX = '-starter';
const SOLUTION_SUFFIX = '-solution';
const COOKING_BRANCH = 'cooking';

export async function main(ctx: Context) {
  const command = await prepareCommand(ctx);

  switch (command.type) {
    case 'start':
      await goToExercise(ctx);
      break;
    case 'checkout-impl':
      checkoutImplementation(ctx, command.exercise);
      break;
    case 'solution':
      await checkoutSolution(ctx, command.exercise);
      break;
    default:
      console.error('Invalid choice');
      process.exit(1);
  }
}

type CommandType = 'start' | 'checkout-impl' | 'solution';

type Command =
  | {
      type: 'start';
    }
  | {
      type: 'checkout-impl' | 'solution';
      exercise: Exercise;
    };

interface Context {
  config: Config;
  commandRunner: CommandRunner;
  fileSystemAdapter: FileSystemAdapter;
  gitAdapter: GitAdapter;
  promptAdapter: PromptAdapter;
}

export async function prepareCommand(ctx: Context): Promise<Command> {
  const { promptAdapter } = ctx;
  const exercise = maybeGetCurrentExercise(ctx);

  if (!exercise) {
    return { type: 'start' };
  }

  const choice = await promptAdapter.prompt<{ command: CommandType }>({
    type: 'autocomplete',
    name: 'command',
    message: 'Choose an option:',
    choices: [
      {
        name: 'start',
        message: 'Start a new exercise',
      },
      ...(exercise.implementationFiles
        ? [
            {
              name: 'checkout-impl',
              message: 'My test is ready, checkout the implementation',
            } as const,
          ]
        : []),
      {
        name: 'solution',
        message: 'Go to solution',
      },
    ] satisfies Array<{ name: CommandType; message: string }>,
  });

  return { type: choice.command, exercise };
}

export async function checkoutSolution(ctx: Context, exercise: Exercise) {
  await prepareCookingBranch(ctx);
  focusOnProject(ctx, `${exercise.id}${SOLUTION_SUFFIX}`);
}

export async function goToExercise(ctx: Context) {
  const {
    promptAdapter,
    config: { exercises },
  } = ctx;
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
    (exercise) => exercise.id === exerciseChoice.exercise,
  );
  if (!selectedExercise) {
    console.error('Selected exercise not found');
    process.exit(1);
  }

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

  await prepareCookingBranch(ctx);

  if (!tdd) {
    checkoutImplementation(ctx, selectedExercise);
  }

  focusOnProject(ctx, `${selectedExercise.id}${STARTER_SUFFIX}`);

  console.log('\n✅ Exercise setup complete!');
}

export function checkoutImplementation(ctx: Context, exercise: Exercise) {
  const {
    commandRunner,
    config: { base },
  } = ctx;

  console.log(`Checking out solution files...`);
  for (const relativePath of exercise.implementationFiles ?? []) {
    const solutionFile = `apps/${exercise.id}${SOLUTION_SUFFIX}/${relativePath}`;
    const starterFile = `apps/${exercise.id}${STARTER_SUFFIX}/${relativePath}`;

    commandRunner.executeCommand(
      `git show ${base}:${solutionFile} > ${starterFile}`,
    );
  }
}

function maybeGetCurrentExercise({
  config,
  fileSystemAdapter,
}: Context): Exercise | null {
  const { defaultProject } = JSON.parse(fileSystemAdapter.readFile('nx.json'));
  const { exercises } = config;

  if (defaultProject == null || !defaultProject.endsWith('-starter')) {
    return null;
  }

  const exerciseId = defaultProject.replace(STARTER_SUFFIX, '');

  return exercises.find((exercise) => exercise.id === exerciseId) ?? null;
}

function focusOnProject(ctx: Context, project: string) {
  const { commandRunner, fileSystemAdapter } = ctx;
  const nxJson = JSON.parse(fileSystemAdapter.readFile('nx.json'));
  fileSystemAdapter.writeFile(
    'nx.json',
    JSON.stringify({
      ...nxJson,
      defaultProject: project,
    }),
  );

  const appsFolder = 'apps';
  for (const folder of fileSystemAdapter.readDir(appsFolder)) {
    if (folder !== project) {
      fileSystemAdapter.removeDir(join(appsFolder, folder));
    }
  }

  commandRunner.executeCommand(`pnpm nx format --files nx.json`);
  commandRunner.executeCommand(`git add .`);
  commandRunner.executeCommand(`git commit -m "feat: ✨ focus on ${project}"`);
}

async function prepareCookingBranch(ctx: Context) {
  const {
    commandRunner,
    config: { base },
  } = ctx;
  const branch = COOKING_BRANCH;
  await maybeWipeout(ctx);

  console.log(`Switching to "${branch}" branch...`);

  commandRunner.executeCommand(`git switch ${base}`);
  commandRunner.executeCommand(`git branch -D ${branch} || true`);
  commandRunner.executeCommand(`git switch -c ${branch}`);
}

async function maybeWipeout(ctx: Context) {
  const { commandRunner, gitAdapter, promptAdapter } = ctx;
  if (!gitAdapter.hasLocalChanges()) {
    return;
  }

  const { confirmOverwrite } = await promptAdapter.prompt<{
    confirmOverwrite: boolean;
  }>({
    type: 'confirm',
    name: 'confirmOverwrite',
    message:
      'You have local changes (including untracked files). This will overwrite all your local changes. Continue?',
    initial: true,
  });

  if (!confirmOverwrite) {
    console.log('Operation cancelled.');
    process.exit(0);
  }

  console.log('Resetting to clean state...');
  commandRunner.executeCommand('git reset --hard');

  console.log('Cleaning untracked files...');
  commandRunner.executeCommand('git clean -df');
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main({
    config,
    commandRunner: new CommandRunner(),
    fileSystemAdapter: new FileSystemAdapter(),
    gitAdapter: new GitAdapter(),
    promptAdapter: new PromptAdapter(),
  });
}
