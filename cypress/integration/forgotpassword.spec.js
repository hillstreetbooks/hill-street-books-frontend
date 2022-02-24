import { MockServiceCall } from '../support/utils';

describe('Forgot Password', () => {
  it('Verify whether the forgot password page exists', () => {
    cy.visit('/login');
    cy.get('.login-wrapper form .options-wrapper span').click();
    cy.url().should('eq', 'http://localhost:3000/forgot-password');
  });

  it('Verify if the form validates empty fields', () => {
    cy.visit('/forgot-password');
    cy.get('.forgot-password-wrapper form button.button').click();
    cy.get('.forgot-password-wrapper form .error-message-wrapper').should(
      'have.length',
      1
    );
    cy.get(
      '.forgot-password-wrapper form .error-message-wrapper .error-message'
    ).contains('This field cannot be empty');
  });

  it('Verify if the form validates username as a valid email', () => {
    cy.visit('/forgot-password');
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:first-child input.input-field'
    )
      .click()
      .type('john');
    cy.get('.forgot-password-wrapper form button.button').click();
    cy.get('.forgot-password-wrapper form .error-message-wrapper').should(
      'have.length',
      1
    );
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:first-child + .error-message-wrapper .error-message'
    ).contains('Please enter a valid Email ID');
  });

  it('Verify if the username is present in the database records', () => {
    cy.visit('/forgot-password');
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:first-child input.input-field'
    )
      .click()
      .type('john.doe@yopmail.com');
    MockServiceCall.retrievePassword(cy, 'john.doe@yopmail.com');
    cy.get('.forgot-password-wrapper form button.button').click();
    cy.get('.MuiBox-root.css-13vmpug').should('have.length', 1);
    cy.get('.MuiBox-root.css-13vmpug p').contains('Username not found!');
  });

  it(`Verify if the reset password email is sent to the author's Email ID`, () => {
    cy.visit('/forgot-password');
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:first-child input.input-field'
    )
      .click()
      .type('john@yopmail.com');
    MockServiceCall.retrievePassword(cy, 'john@yopmail.com');
    cy.get('.forgot-password-wrapper form button.button').click();
    cy.get('.MuiBox-root.css-13vmpug').should('have.length', 1);
    cy.get('.MuiBox-root.css-13vmpug p').contains(
      'A Verification email has been sent to the registered Email ID!'
    );
  });
});
