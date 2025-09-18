/* eslint-disable @nx/enforce-module-boundaries */
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/tests/whiskmate',
  plugins: [angular()],
});
