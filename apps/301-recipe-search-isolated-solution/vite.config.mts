import analog from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/tests/whiskmate',
  plugins: [
    analog()
      /**
       * Disable angularVitestPlugin because it includes @angular/cdk and its side-effect
       * is that we end up with two instances of the module. This can cause the following error
       * when using Angular CDK Harnesses:
       *   SyntaxError: '' is not a valid selector
       *
       * The common problem is that `@angular/material` is using `@angular/cdk` internally
       * and end up with a different reference to `HarnessPredicate` and `instanceof` check fails.
       *
       * Another workaround is to inline `@angular/material` but the side effect is that
       * it makes vitest load and transform more code, thus slowing down the tests.
       *
       * We also don't need to downlevel `async/await` because our tests are zoneless.
       *
       * @see https://github.com/analogjs/analog/blob/817b8253ca559b825cafa8d18be298abf4e5d46e/packages/vite-plugin-angular/src/lib/angular-vitest-plugin.ts#L11
       */
      .filter(({ name }) => name !== '@analogjs/vitest-angular-esm-plugin'),
  ],
});
