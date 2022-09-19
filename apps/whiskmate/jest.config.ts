/* eslint-disable */
export default {
  displayName: 'whiskmate',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  moduleNameMapper: {
    '!!file-loader!(.*)': '$1',
  },
  coverageDirectory: '../../coverage/apps/whiskmate',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: {
    '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular',
    '^.+\\.jpg$': 'jest-file-loader',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
