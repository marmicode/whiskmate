import { defineConfig, devices } from '@jscutlery/playwright-ct-angular';
import { nxE2EPreset } from '@nx/playwright/preset';
import analog from '@analogjs/vite-plugin-angular';

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
      /* Allow invalid version due to compatible vite versions Plugin type mismatch. */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      plugins: [analog() as any],
      resolve: {
        /* @angular/material is using "style" as a Custom Conditional export to expose prebuilt styles etc... */
        conditions: ['style'],
      },
    },
  },
  timeout: 10000,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
