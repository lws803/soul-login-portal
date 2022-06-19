/// <reference types="cypress" />

describe('Login', () => {
  const state = 'STATE';
  const callback = 'http://test.localhost:3000';
  const codeChallenge = 'CODE_CHALLENGE';
  const platformId = 2;

  const rootPage =
    `/?client_id=${platformId}&redirect_uri=${callback}` +
    `&state=${state}&code_challenge=${codeChallenge}`;

  it('can navigate to the login page.', () => {
    cy.visit(rootPage);
    cy.document().contains('Login to your account');
    cy.document().contains('Email');
    cy.document().contains('Password');
  });

  it('shows an error when platformId, callback or state are not present and login is not clickable', () => {
    cy.visit('/');
    cy.document().contains(
      'Insufficient parameters provided in the url, a redirect_uri, client_id, ' +
        'state and code_challenge must be specified.',
    );

    cy.get('button:contains("Login")').should('be.disabled');
  });

  it('navigates to register', () => {
    cy.visit(rootPage);
    cy.contains('Register now').click();
    cy.location('pathname').should('eq', '/register/');
    cy.location('search').should(
      'eq',
      `?client_id=${platformId}&redirect_uri=${callback}&state=${state}&code_challenge=${codeChallenge}`,
    );
  });

  it('navigates to request password reset', () => {
    cy.visit(rootPage);
    cy.get('a').invoke('removeAttr', 'target');

    cy.contains('Forgot password?').click();
    cy.location('pathname').should('eq', '/request-password-reset');
  });

  it('navigates to resend email verification', () => {
    cy.visit(rootPage);
    cy.get('a').invoke('removeAttr', 'target');

    cy.contains('Resend email verification').click();
    cy.location('pathname').should('eq', '/request-email-verification');
  });

  it('log in successfully', () => {
    const code = 'AUTH_CODE';
    cy.intercept(
      {
        method: 'POST',
        url:
          `http://api.network.com/v1/auth/code?client_id=${platformId}` +
          `&redirect_uri=http:%2F%2Ftest.localhost:3000&state=${state}&code_challenge=${codeChallenge}`,
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

    cy.visit(rootPage);
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();

    cy.contains(code);
    cy.contains(state);
  });

  it('fails validation when no password is provided', () => {
    cy.visit(rootPage);
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('button:contains("Login")').click();

    cy.contains('password is a required field');
  });

  it('fails validation when no email is provided', () => {
    cy.visit(rootPage);
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();

    cy.contains('email is a required field');
  });

  it('fails both validation when no fields are provided', () => {
    cy.visit(rootPage);
    cy.get('button:contains("Login")').click();

    cy.contains('password is a required field');
    cy.contains('email is a required field');
  });

  it('redirects to register when user is not found', () => {
    cy.intercept(
      {
        method: 'POST',
        url:
          `http://api.network.com/v1/auth/code?client_id=${platformId}` +
          `&redirect_uri=http:%2F%2Ftest.localhost:3000&state=${state}&code_challenge=${codeChallenge}`,
      },
      { statusCode: 404, body: { error: 'USER_NOT_FOUND' } },
    ).as('loginUser');

    cy.visit(rootPage);
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();

    cy.contains('Create new account');
  });

  it('joins platform when user has not joined', () => {
    const code = 'AUTH_CODE';

    cy.intercept(
      {
        method: 'POST',
        url: `http://api.network.com/v1/auth/code?*`,
      },
      { statusCode: 404, body: { error: 'PLATFORM_USER_NOT_FOUND' } },
    ).as('loginUser');
    cy.intercept(
      {
        method: 'POST',
        url: 'http://api.network.com/v1/auth/login',
      },
      { access_token: 'ACCESS_TOKEN' },
    ).as('loginUserWithoutPlatform');
    cy.intercept(
      {
        method: 'POST',
        url: 'http://api.network.com/v1/platforms/2/join',
      },
      { access_token: 'ACCESS_TOKEN' },
    ).as('joinPlatform');
    cy.intercept(
      {
        method: 'GET',
        url: 'http://test.localhost:3000/*',
      },
      { code, state },
    ).as('exampleSite');

    cy.visit(rootPage);
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button:contains("Login")').click();

    cy.contains('Join Platform!');
    cy.intercept(
      {
        method: 'POST',
        url:
          `http://api.network.com/v1/auth/code?client_id=${platformId}` +
          `&redirect_uri=http:%2F%2Ftest.localhost:3000&state=${state}&code_challenge=${codeChallenge}`,
      },
      { access_token: 'ACCESS_TOKEN' },
    ).as('joinPlatform');

    cy.get('button:contains("Join Platform!")').click();

    cy.contains(code);
    cy.contains(state);
  });
});
