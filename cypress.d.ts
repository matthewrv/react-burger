/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getTestItem(
      testId: string,
      options?: Partial<TypeOptions>
    ): Chainable<JQuery<Element>>;
    findTestItem(
      testId: string,
      options?: Partial<TypeOptions>
    ): Chainable<JQuery<Element>>;
  }
}
