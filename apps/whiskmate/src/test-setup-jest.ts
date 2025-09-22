import 'zone.js';
import 'zone.js/testing';
import '@testing-library/jest-dom';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);

const originalItTodo = it.todo.bind(it);
/* Strip extra arguments to align with vitest and avoid the following error:
 * "todo must be called with only a description." */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
it.todo = ((name: string) => originalItTodo(name)) as any;
