import { MockServiceCall } from '../support/utils';

describe('Reset Password', () => {
  beforeEach(() => {
    cy.visit(
      '/password-reset/62006e73b5a819f3d36d4fcc/bf2a9ddd-7350-4f57-874f-9090a09a90cc62006e73b5a819f3d36d4fcc'
    );
  });
  it('Verify whether the resey password page exists', () => {
    cy.url().should(
      'eq',
      'http://localhost:3000/password-reset/62006e73b5a819f3d36d4fcc/bf2a9ddd-7350-4f57-874f-9090a09a90cc62006e73b5a819f3d36d4fcc'
    );
  });

  it('Verify if the form validates empty fields', () => {
    cy.get('.forgot-password-wrapper form button.button').click();
    cy.get('.forgot-password-wrapper form .error-message-wrapper').should(
      'have.length',
      2
    );
    cy.get(
      '.forgot-password-wrapper form .error-message-wrapper .error-message'
    ).contains('This field cannot be empty');
  });

  it('Verify if the password is valid', () => {
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:nth-child(1) input.input-field'
    )
      .click()
      .type('john@123');
    cy.get('.forgot-password-wrapper form button.button').click();
    cy.get('.forgot-password-wrapper form .error-message-wrapper').should(
      'have.length',
      2
    );
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:nth-child(1) + .error-message-wrapper .error-message'
    ).contains(
      'Password requirements are not met. Please hover (?) to check the requirements.'
    );
  });

  it('Verify if a password is accepted', () => {
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:nth-child(1) input.input-field'
    )
      .click()
      .type('John@123');
    cy.get('.forgot-password-wrapper form button.button').click();
    cy.get('.forgot-password-wrapper form .error-message-wrapper').should(
      'have.length',
      1
    );
  });

  it('Verify if the re-entered password is the same as the password', () => {
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:nth-child(1) input.input-field'
    )
      .click()
      .type('John@123');
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:nth-child(2) input.input-field'
    )
      .click()
      .type('john@123');
    cy.get('.forgot-password-wrapper form button.button').click();
    cy.get('.forgot-password-wrapper form .error-message-wrapper').should(
      'have.length',
      1
    );
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:nth-child(2) + .error-message-wrapper .error-message'
    ).contains('Passwords do not match!');
  });

  it('Verify if the password is reset successfully if the reset link has expired', () => {
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:nth-child(1) input.input-field'
    )
      .click()
      .type('John@123');
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:nth-child(2) input.input-field'
    )
      .click()
      .type('John@123');
    MockServiceCall.resetPassword(
      cy,
      'bf2a9ddd-7350-4f57-874f-9090a09a90cc62006e73b5a819f3d36d4fcd'
    );
    cy.get('.forgot-password-wrapper form button.button').click();
    cy.get('.forgot-password-wrapper form .error-message-wrapper').should(
      'have.length',
      0
    );
  });

  it('Verify if the password is reset successfully if the reset link is valid', () => {
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:nth-child(1) input.input-field'
    )
      .click()
      .type('John@123');
    cy.get(
      '.forgot-password-wrapper form .input-wrapper:nth-child(2) input.input-field'
    )
      .click()
      .type('John@123');
    MockServiceCall.resetPassword(
      cy,
      'bf2a9ddd-7350-4f57-874f-9090a09a90cc62006e73b5a819f3d36d4fcc'
    );
    cy.get('.forgot-password-wrapper form button.button').click();
    cy.get('.forgot-password-wrapper form .error-message-wrapper').should(
      'have.length',
      0
    );
  });
});
