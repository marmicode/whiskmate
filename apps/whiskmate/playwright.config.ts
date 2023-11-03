import { defineConfig } from '@jscutlery/playwright-ct-angular';
import { nxE2EPreset } from '@nx/playwright/preset';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: '.' }),
  testMatch: ['**/*.pw.ts'],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    ctViteConfig: {
      resolve: {
        /* @angular/material is using "style" as a Custom Conditional export to expose prebuilt styles etc... */
        conditions: ['style'],
      },
    },
  },
  timeout: 10_000,
});
