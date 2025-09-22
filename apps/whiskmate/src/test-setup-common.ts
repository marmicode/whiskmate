import './styles.css';

import { provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

const isDebugBrowserMode =
  typeof process !== 'undefined' && process.env.DEBUG_BROWSER != null;

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
  {
    teardown: {
      destroyAfterEach: !isDebugBrowserMode,
    },
  },
);

beforeEach(() => {
  getTestBed().configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});
