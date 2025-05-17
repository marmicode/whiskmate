import { workspaceRoot, type NxJsonConfiguration } from '@nx/devkit';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path/posix';

const PROJECT_PATH = 'apps/whiskmate';

main();

function main() {
  const nxJsonPath = join(workspaceRoot, 'nx.json');
  const tsConfigSpecJsonPath = join(
    workspaceRoot,
    PROJECT_PATH,
    'tsconfig.spec.json',
  );

  updateJson(nxJsonPath, updateNxJson);
  updateJson(tsConfigSpecJsonPath, updateTsconfigSpecJson);

  execSync('pnpm nx format --base HEAD');
}

function updateJson(filePath: string, updaterFn: (json: any) => any) {
  const jsonContent = JSON.parse(readFileSync(filePath, 'utf-8'));
  const updatedJson = updaterFn(jsonContent);
  writeFileSync(filePath, JSON.stringify(updatedJson, null, 2));
}

function updateNxJson(nxJson: NxJsonConfiguration) {
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

function updateTsconfigSpecJson(tsconfigSpecJson: any) {
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
