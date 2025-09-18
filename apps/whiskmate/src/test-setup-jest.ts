/// <reference types="jest" />

import '@testing-library/jest-dom';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { provideZonelessChangeDetection } from '@angular/core';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);

beforeEach(() => {
  getTestBed()
    .resetTestingModule()
    .configureTestingModule({ providers: [provideZonelessChangeDetection()] });
});
