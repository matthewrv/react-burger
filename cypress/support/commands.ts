/// <reference types="cypress" />
Cypress.Commands.add(
  "getTestItem",
  (testId: string): Cypress.Chainable<JQuery<Element>> => {
    return cy.get(`[data-testid=${testId}]`);
  }
);

Cypress.Commands.add(
  "findTestItem",
  { prevSubject: true },
  (subject: Cypress.Chainable<Element>, testId: string) => {
    return subject.find(`[data-testid=${testId}]`);
  }
);
