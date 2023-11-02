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
