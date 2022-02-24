import { MockServiceCall } from '../support/utils';

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/registration');
  });
  it('Verify if the form validates empty fields', () => {
    cy.get('.registration-wrapper form button.button').click();
    cy.get('.registration-wrapper form .error-message-wrapper').should(
      'have.length',
      4
    );
    cy.get(
      '.registration-wrapper form .error-message-wrapper .error-message'
    ).contains('This field cannot be empty');
  });

  it('Verify if the form validates username as a valid email', () => {
    cy.get(
      '.registration-wrapper form .input-wrapper:first-child input.input-field'
    )
      .click()
      .type('john');
    cy.get('.registration-wrapper form button.button').click();
    cy.get('.registration-wrapper form .error-message-wrapper').should(
      'have.length',
      4
    );
    cy.get(
      '.registration-wrapper form .input-wrapper:first-child + .error-message-wrapper .error-message'
    ).contains('Please enter a valid Email ID');
  });

  it('Verify if the password is valid', () => {
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(3) input.input-field'
    )
      .click()
      .type('john@123');
    cy.get('.registration-wrapper form button.button').click();
    cy.get('.registration-wrapper form .error-message-wrapper').should(
      'have.length',
      4
    );
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(5) + .error-message-wrapper .error-message'
    ).contains(
      'Password requirements are not met. Please hover (?) to check the requirements.'
    );
  });

  it('Verify if a password is accepted', () => {
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(3) input.input-field'
    )
      .click()
      .type('John@123');
    cy.get('.registration-wrapper form button.button').click();
    cy.get('.registration-wrapper form .error-message-wrapper').should(
      'have.length',
      3
    );
  });

  it('Verify if the re-entered password is the same as the password', () => {
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(3) input.input-field'
    )
      .click()
      .type('John@123');
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(4) input.input-field'
    )
      .click()
      .type('john@123');
    cy.get('.registration-wrapper form button.button').click();
    cy.get('.registration-wrapper form .error-message-wrapper').should(
      'have.length',
      3
    );
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(6) + .error-message-wrapper .error-message'
    ).contains('Passwords do not match!');
  });

  it('Verify if a valid re-entered password is the same as the password', () => {
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(3) input.input-field'
    )
      .click()
      .type('John@123');
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(4) input.input-field'
    )
      .click()
      .type('John@123');
    cy.get('.registration-wrapper form button.button').click();
    cy.get('.registration-wrapper form .error-message-wrapper').should(
      'have.length',
      2
    );
  });

  it('Validate if an author is already registered', () => {
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(1) input.input-field'
    )
      .click()
      .type('john@yopmail.com');
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(2) input.input-field'
    )
      .click()
      .type('John');
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(3) input.input-field'
    )
      .click()
      .type('John@123');
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(4) input.input-field'
    )
      .click()
      .type('John@123');
    MockServiceCall.registerAuthor(cy, 'john@yopmail.com');
    cy.get('.registration-wrapper form button.button').click();
    cy.get('.registration-wrapper form .error-message-wrapper').should(
      'have.length',
      0
    );
    cy.get('.MuiBox-root.css-13vmpug').should('have.length', 1);
    cy.get('.MuiBox-root.css-13vmpug p').contains(
      'An author has already registered with this email!'
    );
  });

  it(`Verify if an email is sent to the author's Email ID`, () => {
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(1) input.input-field'
    )
      .click()
      .type('ryan@yopmail.com');
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(2) input.input-field'
    )
      .click()
      .type('Ryan');
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(3) input.input-field'
    )
      .click()
      .type('Ryan@123');
    cy.get(
      '.registration-wrapper form .input-wrapper:nth-child(4) input.input-field'
    )
      .click()
      .type('Ryan@123');
    MockServiceCall.registerAuthor(cy, 'ryan@yopmail.com');
    cy.get('.registration-wrapper form button.button').click();
    cy.get('.registration-wrapper form .error-message-wrapper').should(
      'have.length',
      0
    );
    cy.get('.MuiBox-root.css-13vmpug').should('have.length', 1);
    cy.get('.MuiBox-root.css-13vmpug p').contains(
      'A Verification email has been sent to the registered Email ID!'
    );
  });

  it(`Verify whether the message is displayed when author clicks the expired verification link in the email`, () => {
    cy.visit('/registration?message=Link has expired. Please sign up again.');
    cy.get('.MuiBox-root.css-13vmpug').should('have.length', 1);
    cy.get('.MuiBox-root.css-13vmpug p').contains(
      'Link has expired. Please sign up again.'
    );
  });

  it(`Verify whether the success message is displayed when author clicks the verification link in the email`, () => {
    cy.visit(
      '/registration?message=Your email has been verified successfully. Please login to access your account.'
    );
    cy.get('.MuiBox-root.css-13vmpug').should('have.length', 1);
    cy.get('.MuiBox-root.css-13vmpug p').contains(
      'Your email has been verified successfully. Please login to access your account.'
    );
  });
});
