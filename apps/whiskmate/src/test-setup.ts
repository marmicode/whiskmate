/* Webstorm seems to need this even though the types
 * are properly defined in tsconfig.spec.json */
/// <reference types="jest" />

import 'zone.js';
import 'zone.js/testing';
import '@testing-library/jest-dom';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { configure } from '@testing-library/dom';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Zone = (globalThis as any)['Zone'] as any;
Zone['ProxyZoneSpec'] = {
  assertPresent: () => ({ onHasTask: noop, resetDelegate: noop }),
};

configure({
  testIdAttribute: 'data-role',
});

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

const originalItTodo = it.todo.bind(it);
/* Strip extra arguments to align with vitest and avoid the following error:
 * "todo must be called with only a description." */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
it.todo = ((name: string) => originalItTodo(name)) as any;
