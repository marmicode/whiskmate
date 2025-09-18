import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

const testPatterns = ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'];
const browserTestPatterns = [
  'src/**/*.browser.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
];

export default mergeConfig(
  viteConfig,
  defineConfig({
    define: {
      'process.env.ATL_SKIP_AUTO_CLEANUP': true,
      'process.env.DEBUG_BROWSER': process.env.DEBUG_BROWSER,
    },
    test: {
      globals: true,
      isolate: false,
      pool: 'threads',
      setupFiles: ['src/test-setup.ts'],
      testTimeout: 3_000,
      projects: [
        {
          extends: true,
          test: {
            name: 'jsdom',
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
