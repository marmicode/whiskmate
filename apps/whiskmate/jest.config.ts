/* eslint-disable */
import { swcAngularJestTransformer } from '@jscutlery/swc-angular';

export default {
  displayName: 'whiskmate',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup-jest.ts'],
  coverageDirectory: '../../coverage/apps/whiskmate',
  transform: {
    '^.+\\.m?(t|j)sx?$': swcAngularJestTransformer(),
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
