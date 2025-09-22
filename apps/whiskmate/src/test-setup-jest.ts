import '@testing-library/jest-dom';

import { provideZonelessChangeDetection } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});

const originalItTodo = it.todo.bind(it);
/* Strip extra arguments to align with vitest and avoid the following error:
 * "todo must be called with only a description." */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
it.todo = ((name: string) => originalItTodo(name)) as any;
