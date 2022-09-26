/* @todo replace with @jscutlery/cypress-harness/support
 * when issue https://github.com/jscutlery/devkit/issues/216 is fixed. */
import 'cypress-pipe';
import 'zone.js/testing';
import { mount } from 'cypress/angular';

import '@percy/cypress';

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

Cypress.Commands.add('mount', mount);

// Cypress.Commands.overwrite<'click', 'element'>(
//   'click',
//   (click, el, x, y, options) => {
//     expect(el.height(), 'Element is not tall enough to be clicked').to.be.gt(
//       50
//     );
//     expect(el.width(), 'Element is not large enough to be clicked').to.be.gt(
//       100
//     );
//     click(el, x, y, options);
//   }
// );
