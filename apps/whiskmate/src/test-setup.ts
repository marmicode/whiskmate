import '@analogjs/vite-plugin-angular/setup-vitest';
import '@testing-library/jest-dom/vitest';

import { getTestBed } from '@angular/core/testing';

import './styles.css';

import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);
