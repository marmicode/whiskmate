/* @todo replace with @jscutlery/cypress-harness/support
 * when issue https://github.com/jscutlery/devkit/issues/216 is fixed. */
import 'cypress-pipe';
import 'zone.js/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Type } from '@angular/core';
import { mount, MountConfig } from 'cypress/angular';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      getByDataRole(role: string): Chainable<JQuery<HTMLElement>>;
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('getByDataRole', (role) => {
  return cy.get(`[data-role="${role}"]`);
});

Cypress.Commands.add(
  'mount',
  <T>(component: Type<T> | string, config?: MountConfig<T>) => {
    return mount(component, {
      ...config,
      imports: [BrowserAnimationsModule, ...(config?.imports || [])],
    });
  }
);
