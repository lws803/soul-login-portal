/// <reference types="cypress" />

describe('PasswordReset', () => {
  it('can navigate to password reset page', () => {
    cy.visit('/reset-password?token=TOKEN');
    cy.contains('Reset new password');
  });

  it('resets password successfully', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'http://api.network.com/v1/users/password-reset?token=TOKEN',
      },
      {},
    ).as('passwordReset');

    cy.visit('/reset-password?token=TOKEN');
    cy.get('input[name="password"]').type('PASSWORD');

    cy.get('button:contains("Reset password")').click();
    cy.contains('Password reset!');
  });

  it('fails validation when no new password is provided', () => {
    cy.visit('/reset-password?token=TOKEN');
    cy.get('button:contains("Reset password")').click();

    cy.contains('password is a required field');
  });

  it('fails due to weak password', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'http://api.network.com/v1/users/password-reset?token=TOKEN',
      },
      {
        statusCode: 400,
        body: {
          error: 'VALIDATION_ERROR',
        },
      },
    ).as('registerUser');

    cy.visit('/reset-password?token=TOKEN');
    cy.get('input[name="password"]').type('PASSWORD');

    cy.get('button:contains("Reset password")').click();
    cy.contains('Password is too weak!');
  });
});
