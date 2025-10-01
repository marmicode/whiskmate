import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

const testPatterns = ['src/**/*.spec.ts'];
const browserTestPatterns = ['src/**/*.browser.spec.ts'];

export default mergeConfig(
  viteConfig,
  defineConfig({
    /* When debugging in the browser, we want to prevent Angular Testing Library
     * and TestBed from cleaning up after the test in order to interact with the browser.
     * Therefore, we disable Angular Testing Library clean up and forward the DEBUG_BROWSER
     * environment variable to move TestBed cleanup from afterEach to beforeEach. */
    define:
      process.env.DEBUG_BROWSER != null
        ? {
            'process.env.ATL_SKIP_AUTO_CLEANUP': 'true',
            'process.env.DEBUG_BROWSER': 'true',
          }
        : {},
    test: {
      globals: true,
      setupFiles: ['src/test-setup.ts'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/whiskmate',
        provider: 'v8',
      },
      watch: false,
      pool: 'threads',
      projects: [
        {
          extends: true,
          test: {
            name: 'emulated',
            environment: 'jsdom',
            include: testPatterns,
            exclude: browserTestPatterns,
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: browserTestPatterns,
            browser: {
              enabled: true,
              provider: 'playwright',
              instances: [{ browser: 'chromium' }],
            },
          },
        },
      ],
    },
  }),
);
