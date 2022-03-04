import { mkdtemp, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { sep } from 'path';

export async function createTmpDir() {
  const path = await mkdtemp(`${tmpdir()}${sep}`);
  return {
    path,
    async destroy() {
      await rm(path, { recursive: true });
    },
  };
}
