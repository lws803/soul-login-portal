/// <reference types="cypress" />

describe('App', () => {
  it('can navigate to root page', () => {
    cy.visit('/');
    cy.title().should('eq', 'Soul login');
  });
});
