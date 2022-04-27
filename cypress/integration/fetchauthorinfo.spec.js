import { MockServiceCall } from '../support/utils';

describe('Author Profile', () => {
  it('Verify whether the forgot password page exists', () => {
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
      'http://localhost:3000/author/62006e73b5a819f3d36d4fcc'
    );
  });

  it(`Verify whether the user is redirected to the profile page on click`, () => {
    cy.get('.header-wrapper .user-section .menu-wrapper').click();
    cy.get(
      '.header-wrapper .user-section .menu .menu-item:nth-child(3)'
    ).click();
    MockServiceCall.fetchAuthorInfo(cy);
    cy.url().should('eq', 'http://localhost:3000/profile');
  });

  //   it(`Verify if the name is fetched`, () => {
  //     cy.get(
  //       '.profile-wrapper .form-content-wrapper .input-wrapper input[type="name"]'
  //     ).should('eq', 'John Smith');
  //   });
});
