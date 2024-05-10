import { defineConfig } from 'cypress';
import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';

export default defineConfig({
  component: nxComponentTestingPreset(__filename, {
    buildTarget: 'whiskmate:build',
    ctTargetName: 'test-ui-cypress',
  }),
});
