/// <reference types="cypress" />

describe('RequestPasswordReset', () => {
  it('can navigate to password reset page', () => {
    cy.visit('/request-password-reset');
    cy.contains('Request new password');
  });

  it('requests password reset successfully', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.soul-network.com/v1/users/request-password-reset-token?email=test@mail.com',
      },
      {},
    ).as('requestPasswordReset');

    cy.visit('/request-password-reset');
    cy.get('input[name="email"]').type('test@mail.com');

    cy.get('button:contains("Request password reset")').click();
    cy.contains('Request submitted!');
  });

  it('fails validation when no email is provided', () => {
    cy.visit('/request-password-reset');

    cy.get('button:contains("Request password reset")').click();

    cy.contains('email is a required field');
  });
});
