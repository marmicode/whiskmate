import '@jscutlery/cypress-angular/support';
import '@jscutlery/cypress-harness/support';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      getByDataRole(role: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('getByDataRole', (role) => {
  return cy.get(`[data-role="${role}"]`);
});
