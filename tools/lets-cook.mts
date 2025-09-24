import { execSync } from 'child_process';
import enquirer from 'enquirer';
import { exercises } from './exercises.mts';
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
