/* Webstorm seems to need this even though the types
 * are properly defined in tsconfig.spec.json */
import 'zone.js';
import 'zone.js/testing';
import '@testing-library/jest-dom/vitest';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

const originalItTodo = it.todo.bind(it);
/* Strip extra arguments to align with vitest and avoid the following error:
 * "todo must be called with only a description." */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
it.todo = ((name: string) => originalItTodo(name)) as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Symbol as any).dispose ??= Symbol('Symbol.dispose');
(Symbol as any).asyncDispose ??= Symbol('Symbol.asyncDispose');
