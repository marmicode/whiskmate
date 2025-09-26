import './styles.css';

import { provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

const isDebugBrowserMode =
  typeof process !== 'undefined' && process.env.DEBUG_BROWSER != null;

/**
 * When debugging tests in the browser, we do not want to destroy the test
 * environment after the test, so that we can inspect the DOM or even manually
 * interact with the components.
 */
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
  { teardown: { destroyAfterEach: !isDebugBrowserMode } },
);

beforeEach(() => {
  getTestBed().configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});
