import '@angular/compiler';
import { defineConfig, devices } from '@playwright/test';
import { withTestronautAngular } from '@testronaut/angular';
import { sep } from 'node:path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const projectName = __dirname.split(sep).pop();

export default defineConfig(
  withTestronautAngular({
    configPath: __filename,
    testServer: {
      command: `nx serve ${projectName} --configuration testronaut --port {port}`,
    },
  }),
  {
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env['CI'],
    /* Retry on CI only */
    retries: process.env['CI'] ? 2 : 0,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ],
  },
);
