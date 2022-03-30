/// <reference types="cypress" />

describe('RequestEmailVerification', () => {
  it('can navigate to request new email verification page', () => {
    cy.visit('/request-email-verification');
    cy.contains('Resend email verification');
  });

  it('requests email verification successfully', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.soul-network.com/v1/users/resend-confirmation-token?email=test@mail.com',
      },
      {},
    ).as('requestEmailVerification');

    cy.visit('/request-email-verification');
    cy.get('input[name="email"]').type('test@mail.com');

    cy.get('button:contains("Request email verification")').click();
    cy.contains('Request submitted!');
  });

  it('fails validation when no email is provided', () => {
    cy.visit('/request-email-verification');
    cy.get('button:contains("Request email verification")').click();

    cy.contains('email is a required field');
  });
});
