import { execSync } from 'child_process';
import inquirer from 'enquirer';
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
const { prompt } = inquirer;

export class CommandRunner {
  executeCommand(
    command: string,
    { env }: { env?: Record<string, string> } = {},
  ): void {
    /* Ignore stdout. */
    execSync(command, {
      stdio: ['inherit', 'pipe', 'inherit'],
      env: {
        ...process.env,
        ...env,
      },
    });
  }
}

export class FileSystemAdapter {
  readFile(path: string): string {
    return readFileSync(path, {
      encoding: 'utf-8',
    });
  }

  writeFile(path: string, content: string): void {
    writeFileSync(path, content, {
      encoding: 'utf-8',
    });
  }

  readDir(path: string): string[] {
    return readdirSync(path);
  }

  removeDir(path: string): void {
    rmSync(path, { recursive: true });
  }
}

export class GitAdapter {
  getCurrentBranch() {
    return execSync('git branch --show-current', {
      encoding: 'utf8',
    }).trim();
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
