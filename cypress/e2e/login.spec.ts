/// <reference types="cypress" />

describe('Login', () => {
  it('can navigate to the login page.', () => {
    cy.visit('/?platformId=2&callback=https://www.example.com&state=STATE');
    cy.document().contains('Login to your account');
    cy.document().contains('Email');
    cy.document().contains('Password');
  });

  it('shows an error when platformId, callback or state are not present and login is not clickable', () => {
    cy.visit('/');
    cy.document().contains(
      'Insufficient parameters provided in the url, a callback, platformId and state must be specified.',
    );

    cy.get('button:contains("Login")').should('be.disabled');
  });

  it('navigates to register', () => {
    cy.visit('/?platformId=2&callback=https://www.example.com&state=STATE');
    cy.contains('Register Now').click();
    cy.location('pathname').should('eq', '/register/');
    cy.location('search').should(
      'eq',
      '?platformId=2&callback=https://www.example.com&state=STATE',
    );
  });

  it('navigates to request password reset', () => {
    cy.visit('/?platformId=2&callback=https://www.example.com&state=STATE');
    cy.contains('Forgot password?').click();
    cy.location('pathname').should('eq', '/request-password-reset');
  });

  it('navigates to resend email verification', () => {
    cy.visit('/?platformId=2&callback=https://www.example.com&state=STATE');
    cy.contains('Resend email verification').click();
    cy.location('pathname').should('eq', '/request-email-verification');
  });

  it('log in successfully', () => {
    const code = 'AUTH_CODE';
    const state = 'STATE';
    cy.intercept(
      {
        method: 'POST',
        url: `https://api.soul-network.com/v1/auth/code?platformId=2&callback=http:%2F%2Ftest.localhost:3000&state=${state}`,
      },
      { code, state },
    ).as('loginUser');
    cy.intercept(
      {
        method: 'GET',
        url: 'http://test.localhost:3000/*',
      },
      { code, state },
    ).as('exampleSite');

    cy.visit(
      `/?platformId=2&callback=http://test.localhost:3000&state=${state}`,
    );
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();

    cy.contains(code);
    cy.contains(state);
  });

  it('fails validation when no password is provided', () => {
    cy.visit('/?platformId=2&callback=http://test.localhost:3000&state=STATE');
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('button:contains("Login")').click();

    cy.contains('password is a required field');
  });

  it('fails validation when no email is provided', () => {
    cy.visit('/?platformId=2&callback=http://test.localhost:3000&state=STATE');
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();

    cy.contains('email is a required field');
  });

  it('fails both validation when no fields are provided', () => {
    cy.visit('/?platformId=2&callback=http://test.localhost:3000&state=STATE');
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

    cy.visit('/?platformId=2&callback=http://test.localhost:3000&state=STATE');
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();

    cy.contains('Create new account');
  });

  it('joins platform when user has not joined', () => {
    const code = 'AUTH_CODE';
    const state = 'STATE';

    cy.intercept(
      {
        method: 'POST',
        url: `https://api.soul-network.com/v1/auth/code?platformId=2&callback=http:%2F%2Ftest.localhost:3000&state=${state}`,
      },
      { statusCode: 404, body: { error: 'PLATFORM_USER_NOT_FOUND' } },
    ).as('loginUser');
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.soul-network.com/v1/auth/login',
      },
      { accessToken: 'ACCESS_TOKEN' },
    ).as('loginUserWithoutPlatform');
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.soul-network.com/v1/platforms/2/join',
      },
      { accessToken: 'ACCESS_TOKEN' },
    ).as('joinPlatform');
    cy.intercept(
      {
        method: 'GET',
        url: 'http://test.localhost:3000/*',
      },
      { code, state },
    ).as('exampleSite');

    cy.visit(
      `/?platformId=2&callback=http://test.localhost:3000&state=${state}`,
    );
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();

    cy.contains('Join Platform!');

    cy.intercept(
      {
        method: 'POST',
        url: `https://api.soul-network.com/v1/auth/code?platformId=2&callback=http:%2F%2Ftest.localhost:3000&state=${state}`,
      },
      { code, state },
    ).as('loginUser');

    cy.get('button:contains("Join Platform!")').click();

    cy.contains(code);
    cy.contains(state);
  });
});
