/// <reference types="cypress" />

describe('Register', () => {
  it('can navigate to register page', () => {
    cy.visit('/register');

    cy.contains('Create new account');
  });

  it('navigates to login', () => {
    cy.visit('/register/?platformId=2&callback=https://www.example.com');
    cy.contains('Log in').click();
    cy.location('pathname').should('eq', '/');
    cy.location('search').should(
      'eq',
      '?platformId=2&callback=https://www.example.com',
    );
  });

  it('registers successfully', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.soul-network.com/v1/users',
      },
      {
        id: 38,
        username: 'username',
        userHandle: 'username#38',
        email: 'test@mail.com',
        isActive: false,
        createdAt: '2022-03-30T22:03:06.086Z',
        updatedAt: '2022-03-30T22:03:06.000Z',
      },
    ).as('registerUser');

    cy.visit('/register/?platformId=2&callback=http://test.localhost:3000');
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('DESx!&X29x8L5Scj');

    cy.get('button:contains("Register")').click();

    // Redirects back to login
    cy.location('pathname').should('eq', '/');
    cy.location('search').should(
      'eq',
      '?platformId=2&callback=http://test.localhost:3000',
    );
  });

  it('fails due to existing account', () => {
    const email = 'test@mail.com';
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.soul-network.com/v1/users',
      },
      {
        statusCode: 409,
        body: {
          message: `A user with the email address: ${email} already exists. Please login or use a different email address.`,
          error: 'DUPLICATE_USER_EXISTS',
        },
      },
    ).as('registerUser');

    cy.visit('/register/?platformId=2&callback=http://test.localhost:3000');
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('DESx!&X29x8L5Scj');

    cy.get('button:contains("Register")').click();
    cy.contains(
      `A user with the email address: ${email} already exists. Please login or use a different email address.`,
    );
  });

  it('fails due to weak password', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'https://api.soul-network.com/v1/users',
      },
      {
        statusCode: 400,
        body: {
          error: 'VALIDATION_ERROR',
        },
      },
    ).as('registerUser');

    cy.visit('/register/?platformId=2&callback=http://test.localhost:3000');
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('password');

    cy.get('button:contains("Register")').click();
    cy.contains('Password is too weak!');
  });

  it('fails validation when bad email is provided', () => {
    cy.visit('/register/?platformId=2&callback=http://test.localhost:3000');
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="email"]').type('test@');
    cy.get('input[name="password"]').type('DESx!&X29x8L5Scj');

    cy.get('button:contains("Register")').click();
    cy.contains('email must be a valid email');
  });
});
