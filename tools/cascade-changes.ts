import { execSync } from 'child_process';
import { exercises } from './exercices.ts';

async function main(args: string[]) {
  const [startProject = computeExerciseProjects(exercises[0].id).starter] =
    args;

  const exerciceIds = exercises.map((exercise) => exercise.id);

  const projects = exerciceIds
    .map((exerciseId) => {
      const { starter, solution } = computeExerciseProjects(exerciseId);
      return [starter, solution];
    })
    .flat();

  const startIndex = projects.indexOf(startProject);
  const filteredProjects = projects.slice(startIndex);

  const pairwisedProjects = filteredProjects.reduce(
    (acc, project, index) => {
      if (index > 0) {
        acc.push([projects[index - 1], project]);
      }
      return acc;
    },
    [] as [string, string][],
  );

  for (const [source, destination] of pairwisedProjects) {
    execSync(`pnpm clone-changes ${source} ${destination}`, {
      stdio: 'inherit',
    });
  }
}

function computeExerciseProjects(exerciseId: string) {
  return {
    starter: `${exerciseId}-starter`,
    solution: `${exerciseId}-solution`,
  };
}

main(process.argv.slice(2));
