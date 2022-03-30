/// <reference types="cypress" />

describe('App', () => {
  it('Can navigate to root page.', () => {
    cy.visit('/');
    cy.title().should('eq', 'Soul login');
  });
});
