import { getStore, MockServiceCall } from '../support/utils';

describe('Login', () => {
  it('Verify if the form validates empty fields', () => {
    cy.visit('/login');
    cy.get('.login-wrapper form button.button').click();
    cy.get('.login-wrapper form .error-message-wrapper').should(
      'have.length',
      2
    );
    cy.get(
      '.login-wrapper form .error-message-wrapper .error-message'
    ).contains('This field cannot be empty');
  });

  it('Verify if the form validates username as a valid email', () => {
    cy.visit('/login');
    cy.get('.login-wrapper form .input-wrapper:first-child input.input-field')
      .click()
      .type('john');
    cy.get('.login-wrapper form button.button').click();
    cy.get('.login-wrapper form .error-message-wrapper').should(
      'have.length',
      2
    );
    cy.get(
      '.login-wrapper form .input-wrapper:first-child + .error-message-wrapper .error-message'
    ).contains('Please enter a valid Email ID');
  });

  it('Verify if the username is present in the database records', () => {
    cy.visit('/login');
    cy.get('.login-wrapper form .input-wrapper:first-child input.input-field')
      .click()
      .type('john.doe@yopmail.com');
    cy.get('.login-wrapper form .input-wrapper:nth-child(2) input.input-field')
      .click()
      .type('John@456');
    MockServiceCall.login(cy, 'john.doe@yopmail.com', 'John@456');
    cy.get('.login-wrapper form button.button').click();
    cy.get('.MuiBox-root.css-13vmpug').should('have.length', 1);
    cy.get('.MuiBox-root.css-13vmpug p').contains('Username not found!');
  });

  it(`Authenticate author's credentials with invalid data`, () => {
    cy.visit('/login');
    cy.get('.login-wrapper form .input-wrapper:first-child input.input-field')
      .click()
      .type('john@yopmail.com');
    cy.get('.login-wrapper form .input-wrapper:nth-child(2) input.input-field')
      .click()
      .type('John@456');
    cy.get(
      '.login-wrapper form .options-wrapper .remain-signed-in input'
    ).check();
    MockServiceCall.login(cy, 'john@yopmail.com', 'John@456');
    cy.get('.login-wrapper form button.button').click();
    cy.get('.MuiBox-root.css-13vmpug').should('have.length', 1);
    cy.get('.MuiBox-root.css-13vmpug p').contains(
      'Sorry, your password is incorrect. Please try again with the correct password or use the forgot password option to reset your password.'
    );
  });

  it(`Authenticate author's credentials with valid data`, () => {
    validAuthentication(cy);
  });

  it(`Verify whether the response is saved in the store`, () => {
    validAuthentication(cy);
    getStore().its('user.info').should('not.be.null');
    getStore().its('user.info.username').should('equal', 'john@yopmail.com');
  });

  it(`Verify whether the author's name is displayed in the header`, () => {
    cy.get('.header-wrapper .user-section .menu-wrapper .details').contains(
      'Hi John'
    );
  });

  it(`Verify if the menu is opened on click and has 4 menu items`, () => {
    cy.get('.header-wrapper .user-section .menu-wrapper').click();
    cy.get('.header-wrapper .user-section .menu .menu-item').should(
      'have.length',
      4
    );
  });

  it(`Verify whether the user is redirected to the profile page on click`, () => {
    cy.get(
      '.header-wrapper .user-section .menu .menu-item:nth-child(3)'
    ).click();
    cy.url().should('eq', 'http://localhost:3000/profile');
  });

  it(`Verify whether the user is signed out on click of the sign out option`, () => {
    cy.get('.header-wrapper .user-section .menu-wrapper').click({
      force: true
    });
    cy.get('.header-wrapper .user-section .menu .menu-item:last-child').click({
      force: true
    });
    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it(`Verify whether the store is updated after sign out`, () => {
    getStore().its('user.info').should('be.null');
  });
});

const validAuthentication = (cy) => {
  cy.visit('/login');
  cy.get('.login-wrapper form .input-wrapper:first-child input.input-field')
    .click()
    .type('john@yopmail.com');
  cy.get('.login-wrapper form .input-wrapper:nth-child(2) input.input-field')
    .click()
    .type('John@123');
  MockServiceCall.login(cy, 'john@yopmail.com', 'John@123');
  cy.get('.login-wrapper form button.button').click();
  cy.url().should(
    'equal',
    'http://localhost:3000/author/edit/62006e73b5a819f3d36d4fcc'
  );
};
