import '@jscutlery/cypress-harness/support-ct';
import '@percy/cypress';
import '@testing-library/cypress/add-commands';
import { Type } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { configure } from '@testing-library/cypress';
import { mount, MountConfig } from 'cypress/angular';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      mount: typeof mount;
    }
  }
}

configure({ testIdAttribute: 'data-role' });

Cypress.Commands.add(
  'mount',
  <T>(component: Type<T> | string, config?: MountConfig<T>) => {
    return mount(component, {
      ...config,
      imports: [BrowserAnimationsModule, ...(config?.imports || [])],
    });
  }
);
