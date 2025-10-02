import enquirer from 'enquirer';
import { describe, expect, it } from 'vitest';
import { main } from './main';
import {
  CommandRunner,
  FileSystemAdapter,
  GitAdapter,
  PromptAdapter,
} from './infra';
import { Exercise } from './core';

describe('cook', () => {
  it('does not checkout the implementation if TDD is enabled', async () => {
    const { executedCommands, files } = await runMain({
      choices: { exercise: '1-recipe-search' },
      files: {
        'apps/1-recipe-search-solution/some-file.txt': '',
        'apps/1-recipe-search-starter/some-file.txt': '',
        'apps/2-test-double-solution/some-file.txt': '',
        'apps/2-test-double-starter/some-file.txt': '',
      },
      nxJsonContent: {},
    });

    expect(executedCommands).toEqual([
      'git switch angular-vitest-mini-workshop',
      'git branch -D cooking || exit 0',
      'git switch -c cooking',
      'git add .',
      'git commit -m "feat: ✨ focus on 1-recipe-search-starter"',
    ]);
    expect(files).toEqual({
      'nx.json': JSON.stringify(
        {
          defaultProject: '1-recipe-search-starter',
        },
        null,
        2,
      ),
      'apps/1-recipe-search-starter/some-file.txt': '',
    });
  });

  it('goes to exercise and checks out the implementation from solution project', async () => {
    const { executedCommands } = await runMain({
      choices: { exercise: '1-recipe-search', useTdd: false },
      nxJsonContent: {},
    });

    expect(executedCommands).toEqual([
      'git switch angular-vitest-mini-workshop',
      'git branch -D cooking || exit 0',
      'git switch -c cooking',
      'git show angular-vitest-mini-workshop:apps/1-recipe-search-solution/src/app/recipe/recipe-search.ng.ts > apps/1-recipe-search-starter/src/app/recipe/recipe-search.ng.ts',
      'git add .',
      'git commit -m "feat: ✨ focus on 1-recipe-search-starter"',
    ]);
  });

  it('checks out solution', async () => {
    const { executedCommands, files } = await runMain({
      choices: { command: 'solution', confirmOverwrite: true },
      nxJsonContent: {
        defaultProject: '1-recipe-search-starter',
      },
    });

    expect(executedCommands).toEqual([
      'git switch angular-vitest-mini-workshop',
      'git branch -D cooking || exit 0',
      'git switch -c cooking',
      'git add .',
      'git commit -m "feat: ✨ focus on 1-recipe-search-solution"',
    ]);
    expect(JSON.parse(files['nx.json'])).toEqual({
      defaultProject: '1-recipe-search-solution',
    });
  });

  it('stops cooking', async () => {
    const { executedCommands } = await runMain({
      choices: { command: 'stop' },
      hasLocalChanges: true,
      nxJsonContent: {
        defaultProject: '1-recipe-search-starter',
      },
    });
    expect(executedCommands).toEqual([
      'git reset --hard',
      'git clean -df',
      'git switch angular-vitest-mini-workshop',
    ]);
  });
});

async function runMain({
  choices,
  hasLocalChanges,
  nxJsonContent,
  files = {},
}: {
  choices: Record<string, unknown>;
  hasLocalChanges: boolean;
  nxJsonContent: { defaultProject?: string };
  files?: Record<string, string>;
}) {
  const fileSystemAdapter = new FileSystemFake();
  const commandRunner = new CommandRunnerFake();
  const gitAdapter = new GitFake();
  const promptAdapter = new PromptFake();

  fileSystemAdapter.configure({
    files: {
      ...files,
      'nx.json': JSON.stringify(nxJsonContent),
    },
  });
  gitAdapter.configure({
    hasLocalChanges,
  });
  promptAdapter.configure({ choices });

  const exercises: Exercise[] = [
    {
      id: '1-recipe-search',
      name: 'Recipe Search',
      implementationFiles: ['src/app/recipe/recipe-search.ng.ts'],
    },
    { id: '2-test-double', name: 'Test Double' },
  ];

  await main([], {
    config: {
      base: 'angular-vitest-mini-workshop',
      exercises,
    },
    commandRunner,
    fileSystemAdapter,
    gitAdapter,
    promptAdapter,
  });

  return {
    executedCommands: commandRunner.getExecutedCommands(),
    files: fileSystemAdapter.getFiles(),
  };
}

class CommandRunnerFake implements CommandRunner {
  private _executedCommands: string[] = [];

  executeCommand(
    command: string,
    { env }: { env?: Record<string, string> } = {},
  ) {
    this._executedCommands.push(command);
  }

  getExecutedCommands() {
    return this._executedCommands;
  }
}

class GitFake implements GitAdapter {
  private _hasLocalChanges = false;
  private _currentBranch = 'main';

  configure({
    hasLocalChanges,
    currentBranch,
  }: {
    hasLocalChanges?: boolean;
    currentBranch?: string;
  }) {
    this._hasLocalChanges = hasLocalChanges ?? this._hasLocalChanges;
    this._currentBranch = currentBranch ?? this._currentBranch;
  }

  hasLocalChanges() {
    return this._hasLocalChanges;
  }

  getCurrentBranch() {
    return this._currentBranch;
  }
}

class FileSystemFake implements FileSystemAdapter {
  private _files: Record<string, string> = {};

  configure({ files }: { files: Record<string, string> }) {
    this._files = files;
  }

  getFiles() {
    return this._files;
  }

  readFile(path: string) {
    const content = this._files[path];
    if (!content) {
      throw new Error(`File ${path} not found`);
    }
    return content;
  }

  writeFile(path: string, content: string) {
    this._files[path] = content;
  }

  readDir(dirPath: string): string[] {
    const dirPathTokens = dirPath.split('/');

    return Array.from(
      new Set(
        Object.keys(this._files)
          .map((filePath) => {
            const filePathTokens = filePath.split('/');
            return filePathTokens.slice(0, dirPathTokens.length + 1).join('/');
          })
          .filter((folderPath) => folderPath.startsWith(dirPath))
          .map((folderPath) => folderPath.replace(`${dirPath}/`, '')),
      ),
    );
  }

  removeDir(dirPath: string): void {
    this._files = Object.fromEntries(
      Object.entries(this._files).filter(
        ([filePath]) => !filePath.startsWith(dirPath),
      ),
    );
  }
}

class PromptFake implements PromptAdapter {
  private _choices: Record<string, unknown> = {};

  configure({ choices }: { choices: Record<string, unknown> }) {
    this._choices = choices;
  }

  prompt<T>(
    ...args: Parameters<typeof enquirer.prompt<T>>
  ): ReturnType<typeof enquirer.prompt<T>> {
    const options = args[0] as { name: string; initial?: unknown };
    return Promise.resolve({
      [options.name]: this._choices[options.name] ?? options.initial,
    } as T);
  }
}
