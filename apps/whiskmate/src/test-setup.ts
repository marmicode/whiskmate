/* Webstorm seems to need this even though the types
 * are properly defined in tsconfig.spec.json */
/// <reference types="jest" />

import 'zone.js';
import 'zone.js/testing';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
const Zone = (globalThis as any)['Zone'] as any;
Zone['ProxyZoneSpec'] = {
  assertPresent: () => ({ onHasTask: noop, resetDelegate: noop }),
};

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
