import enquirer from 'enquirer';
import { GitAdapter, main, PromptAdapter } from './cook.mts';

describe('cook', () => {
  it('does not checkout the implementation if TDD is enabled', async () => {
    const gitAdapter = new GitFake();
    const promptAdapter = new PromptFake();

    gitAdapter.configure({
      currentBranch: 'testing-000-starter',
    });

    promptAdapter.configure({
      choices: {
        exercise: '101-meal-planner',
      },
    });

    await main({ gitAdapter, promptAdapter });

    expect(gitAdapter.getExecutedCommands()).toEqual([
      'switch testing-101-meal-planner-starter',
    ]);
  });

  it('goes to exercise and checks out the implementation from flavor solution branch', async () => {
    const gitAdapter = new GitFake();
    const promptAdapter = new PromptFake();

    gitAdapter.configure({
      currentBranch: 'testing-000-starter',
    });

    promptAdapter.configure({
      choices: {
        exercise: '302-recipe-search-integration',
        flavor: 'test-bed',
        useTdd: false,
      },
    });

    await main({ gitAdapter, promptAdapter });

    expect(gitAdapter.getExecutedCommands()).toEqual([
      'switch testing-302-recipe-search-integration-starter',
      'checkout origin/testing-302-recipe-search-integration-solution-test-bed apps/whiskmate/src/app/recipe/recipe-search.ng.ts',
    ]);
  });

  it('checks out solution from flavor solution branch', async () => {
    const gitAdapter = new GitFake();
    const promptAdapter = new PromptFake();

    gitAdapter.configure({
      currentBranch: 'testing-302-recipe-search-integration-starter',
    });

    promptAdapter.configure({
      choices: {
        command: 'solution',
        flavor: 'test-bed',
      },
    });

    await main({ gitAdapter, promptAdapter });

    expect(gitAdapter.getExecutedCommands()).toEqual([
      'checkout origin/testing-302-recipe-search-integration-solution-test-bed apps/whiskmate',
    ]);
  });
});

class GitFake implements GitAdapter {
  private _currentBranch: string;
  private _hasLocalChanges = false;
  private _executedCommands: string[] = [];
  configure({
    currentBranch,
    hasLocalChanges,
  }: {
    currentBranch: string;
    hasLocalChanges?: boolean;
  }) {
    this._currentBranch = currentBranch;
    this._hasLocalChanges = hasLocalChanges ?? this._hasLocalChanges;
  }

  getCurrentBranch() {
    if (!this._currentBranch) {
      throw new Error('Current branch not configured');
    }
    return this._currentBranch;
  }

  hasLocalChanges() {
    return this._hasLocalChanges;
  }

  executeGitCommand(command: string) {
    this._executedCommands.push(command);
  }

  getExecutedCommands() {
    return this._executedCommands;
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
