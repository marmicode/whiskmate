/// <reference types="cypress" />

import { Observable, Subscription } from 'rxjs';

let subscription: Subscription;
beforeEach(() => (subscription = new Subscription()));
afterEach(() => subscription.unsubscribe());

/**
 * Useful helper to spy on outputs which are not EventEmitters in Angular.
 * e.g. `cy.mount(...).then(spyOutput('filterChange'))`
 */
export const spyOutput =
  <T extends object>(prop: string & OutputKeys<T>) =>
  (args: { component: T }) => {
    const { component } = args;
    observe(component[prop] as Observable<unknown>).as(prop);
    return args;
  };

function observe(source$: Observable<unknown>) {
  const observer = cy.stub();
  subscription.add(source$.subscribe(observer));
  return observer;
}

type OutputKeys<T extends object> = {
  [K in keyof T]: T[K] extends Observable<unknown> ? K : never;
}[keyof T];
