import '@jscutlery/cypress-harness/support-ct';
import '@percy/cypress';
import '@testing-library/cypress/add-commands';
import { ProviderToken, Type } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { configure } from '@testing-library/cypress';
import { mount, MountConfig } from 'cypress/angular';
import { TestBed } from '@angular/core/testing';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      inject: typeof inject;
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

Cypress.Commands.add('inject', inject);

function inject<T>(token: ProviderToken<T>) {
  return cy.then(() => TestBed.inject(token)) as Cypress.Chainable<T>;
}
