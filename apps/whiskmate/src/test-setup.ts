import '@testing-library/jest-dom/vitest';
import 'reflect-metadata';
import './styles.css';

import { destroyPlatform, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

/* Reset test environment and destroy the platform to make sure that each test
 * grabs the last reference to globals such as `document`, especially when running
 * tests without isolation, while Vitest is keeping loaded modules in memory.
 *
 * Also, when debugging tests in the browser, we do not want to destroy the test
 * environment after the test, so that we can inspect the DOM or even manually
 * interact with the components.
 * That is why when DEBUG_BROWSER is set, we destroy the test environment before
 * the test. */
(process.env.DEBUG_BROWSER != null ? beforeEach : afterEach)(() => {
  getTestBed().resetTestEnvironment();
  destroyPlatform();
});

beforeEach(() => {
  getTestBed().initTestEnvironment(
    BrowserTestingModule,
    platformBrowserTesting(),
    /* TestBed can't register an afterEach hook during a beforeEach hook.
     * Also, we want to control when to destroy the test environment. */
    { teardown: { destroyAfterEach: false } },
  );

  getTestBed().configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});
