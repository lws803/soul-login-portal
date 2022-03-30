/// <reference types="cypress" />

describe('Login', () => {
  it('can navigate to the login page.', () => {
    cy.visit('/?platformId=2&callback=https://www.example.com');
    cy.document().contains('Login to your account');
    cy.document().contains('Email');
    cy.document().contains('Password');
  });

  it('shows an error when platformId and callback are not present and login is not clickable', () => {
    cy.visit('/');
    cy.document().contains('PlatformId and callback is not present.');

    cy.get('button:contains("Login")').should('be.disabled');
  });

  it('navigates to register', () => {
    cy.visit('/?platformId=2&callback=https://www.example.com');
    cy.contains('Register Now').click();
    cy.location('pathname').should('eq', '/register/');
    cy.location('search').should(
      'eq',
      '?platformId=2&callback=https://www.example.com',
    );
  });

  it('log in successfully', () => {
    const code = 'AUTH_CODE';
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.soul-network.com/v1/auth/code?platformId=2&callback=http://test.localhost:3000',
      },
      { code },
    ).as('loginUser');
    cy.intercept(
      {
        method: 'GET',
        url: 'http://test.localhost:3000/*',
      },
      code,
    ).as('exampleSite');

    cy.visit('/?platformId=2&callback=http://test.localhost:3000');
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();
    cy.contains(code);
  });

  it('fails validation when no password is provided', () => {
    cy.visit('/?platformId=2&callback=http://test.localhost:3000');
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('button:contains("Login")').click();

    cy.contains('password is a required field');
  });

  it('fails validation when no email is provided', () => {
    cy.visit('/?platformId=2&callback=http://test.localhost:3000');
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();

    cy.contains('email is a required field');
  });

  it('fails both validation when no fields are provided', () => {
    cy.visit('/?platformId=2&callback=http://test.localhost:3000');
    cy.get('button:contains("Login")').click();

    cy.contains('password is a required field');
    cy.contains('email is a required field');
  });

  it('redirects to register when user is not found', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.soul-network.com/v1/auth/code?platformId=2&callback=http://test.localhost:3000',
      },
      { statusCode: 404, body: { error: 'USER_NOT_FOUND' } },
    ).as('loginUser');

    cy.visit('/?platformId=2&callback=http://test.localhost:3000');
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();

    cy.contains('Create new account');
  });
});
