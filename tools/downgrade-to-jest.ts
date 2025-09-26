import { workspaceRoot, type NxJsonConfiguration } from '@nx/devkit';
import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path/posix';

const APPS_PATH = 'apps';

main();

function main() {
  updateJson(join(workspaceRoot, 'nx.json'), donwgradeNxJsonUpdater);

  for (const project of readdirSync(join(workspaceRoot, APPS_PATH))) {
    const tsConfigSpecJsonPath = join(
      workspaceRoot,
      APPS_PATH,
      project,
      'tsconfig.spec.json',
    );
    updateJson(tsConfigSpecJsonPath, downgradeTsconfigSpecJsonUpdater);
  }

  execSync('pnpm nx format --base HEAD');
  execSync('pnpm nx reset');
}

function updateJson(filePath: string, updaterFn: (json: any) => any) {
  const jsonContent = JSON.parse(readFileSync(filePath, 'utf-8'));
  const updatedJson = updaterFn(jsonContent);
  writeFileSync(filePath, JSON.stringify(updatedJson, null, 2));
}

function donwgradeNxJsonUpdater(nxJson: NxJsonConfiguration) {
  const plugins = nxJson.plugins?.map((plugin) => {
    if (typeof plugin === 'string') {
      return plugin;
    }

    switch (plugin.plugin) {
      case '@nx/jest/plugin':
        return {
          ...plugin,
          options: {
            ...(plugin.options ?? {}),
            targetName: 'test',
          },
        };
      case '@nx/vite/plugin':
        return {
          ...plugin,
          options: {
            ...(plugin.options ?? {}),
            testTargetName: 'vitest',
          },
        };
    }
    return plugin;
  });

  return {
    ...nxJson,
    plugins,
  };
}

function downgradeTsconfigSpecJsonUpdater(tsconfigSpecJson: any) {
  if (tsconfigSpecJson?.compilerOptions?.types) {
    tsconfigSpecJson.compilerOptions.types =
      tsconfigSpecJson.compilerOptions.types.map((type) => {
        if (type === 'vitest/globals') {
          return 'jest';
        }
        return type;
      });
  }
  return tsconfigSpecJson;
}
