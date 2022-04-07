import { getStore, MockServiceCall } from '../support/utils';

describe('Admin', () => {
  it('Verify if the admin is redirected to the admin dashboard on login', () => {
    authenticateAdmin(cy);
  });

  it('Verify if the authors are fetched on load', () => {
    authenticateAdmin(cy);
  });

  it('Verify if the number of authors fetched is 9', () => {
    cy.get(
      '.dashboard-wrapper .authors-list .MuiDataGrid-row .MuiDataGrid-cell:nth-child(2)'
    ).should('have.length', 9);
  });

  it('Verify if the publish button is disabled for the first record', () => {
    cy.get(
      '.dashboard-wrapper .authors-list .MuiDataGrid-row:first-child .MuiDataGrid-cell:last-child .actions-wrapper button:first-child'
    ).should('be.disabled');
  });

  it('Verify if the no. of records displayed is 1-9 of 9', () => {
    cy.get(
      '.dashboard-wrapper .authors-list .MuiTablePagination-displayedRows'
    ).contains('1–9 of 9');
  });

  it('Verify if the no. of records displayed per page is 10', () => {
    cy.get(
      '.dashboard-wrapper .authors-list .MuiTablePagination-select.MuiSelect-select.MuiSelect-standard.MuiInputBase-input'
    ).contains('10');
  });

  it('Verify if the no. of records displayed per page is 5', () => {
    cy.get(
      '.dashboard-wrapper .authors-list .MuiTablePagination-select.MuiSelect-select.MuiSelect-standard.MuiInputBase-input'
    ).click({ force: true });
    cy.get('ul.MuiList-root.MuiMenu-list li:first-child').click();
    cy.get(
      '.dashboard-wrapper .authors-list .MuiTablePagination-select.MuiSelect-select.MuiSelect-standard.MuiInputBase-input'
    ).contains('5');
  });

  it('Verify if the number of authors displayed is 5', () => {
    cy.get(
      '.dashboard-wrapper .authors-list .MuiDataGrid-row .MuiDataGrid-cell:nth-child(2)'
    ).should('have.length', 5);
  });

  it('Verify if the next set of records are displayed', () => {
    cy.get('.MuiTablePagination-actions button:last-child').click();
  });

  it('Verify if the no. of records displayed is 6-9 of 9', () => {
    cy.get(
      '.dashboard-wrapper .authors-list .MuiTablePagination-displayedRows'
    ).contains('6–9 of 9');
  });

  it('Verify if the number of authors displayed is 4', () => {
    cy.get(
      '.dashboard-wrapper .authors-list .MuiDataGrid-row .MuiDataGrid-cell:nth-child(2)'
    ).should('have.length', 4);
  });
});

const authenticateAdmin = (cy) => {
  cy.visit('/login');
  cy.get('.login-wrapper form .input-wrapper:first-child input.input-field')
    .click()
    .type('steve@yopmail.com');
  cy.get('.login-wrapper form .input-wrapper:nth-child(2) input.input-field')
    .click()
    .type('Steve@123');
  MockServiceCall.adminLogin(cy);
  cy.get('.login-wrapper form button.button').click();
  cy.url().should('equal', 'http://localhost:3000/admin/dashboard');
};
