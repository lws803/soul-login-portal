/// <reference types="cypress" />

describe('The App works as expected.', () => {
  it('Can navigate to the login page.', () => {
    cy.visit('/');
  });
});
