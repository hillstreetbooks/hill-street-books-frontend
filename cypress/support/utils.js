import { MOCK_DATA, URL_ENDPOINTS } from './mockData';

export const basePath = 'http://localhost:3000';

export const getStore = () => cy.window().its('store').invoke('getState');

export class MockServiceCall {
  /**
   * This method validates the author's credentials
   */
  static login = (cy, username, password) => {
    const data = !username.localeCompare('john.doe@yopmail.com')
      ? 'Username not found!'
      : !username.localeCompare('john@yopmail.com') &&
        !password.localeCompare('John@123')
      ? MOCK_DATA.LOGIN
      : 'Sorry, your password is incorrect. Please try again with the correct password or use the forgot password option to reset your password.';
    cy.intercept(
      {
        method: 'POST',
        url: URL_ENDPOINTS.LOGIN
      },
      data
    );
  };

  /**
   * This method validates the admin's credentials
   */
  static adminLogin = (cy) => {
    cy.intercept(
      {
        method: 'POST',
        url: URL_ENDPOINTS.LOGIN
      },
      MOCK_DATA.ADMIN_LOGIN
    );
  };

  /**
   * This method inserts the author's details as a record in the database
   */
  static registerAuthor = (cy, username) => {
    const data = !username.localeCompare('john@yopmail.com')
      ? 'An author has already registered with this email!'
      : 'A Verification email has been sent to the registered Email ID!';
    cy.intercept(
      {
        method: 'POST',
        url: URL_ENDPOINTS.REGISTRATION
      },
      data
    );
  };

  /**
   * This method validates the author's email and sends a retrieve password link
   */
  static retrievePassword = (cy, username) => {
    const data = !username.localeCompare('john.doe@yopmail.com')
      ? 'Username not found!'
      : 'A Verification email has been sent to the registered Email ID!';
    cy.intercept(
      {
        method: 'POST',
        url: URL_ENDPOINTS.FORGOT_PASSWORD
      },
      data
    );
  };

  /**
   * This method resets the Author's Password
   */
  static resetPassword = (cy, uniqueString) => {
    const data =
      uniqueString ==
      'bf2a9ddd-7350-4f57-874f-9090a09a90cc62006e73b5a819f3d36d4fcc'
        ? 'Your password has been reset successfully. Please sign in to access your account.'
        : 'Link has expired. Please try again.';
    cy.intercept(
      {
        method: 'POST',
        url: URL_ENDPOINTS.PASSWORD_RESET
      },
      data
    );
  };

  /**
   * This method fetches the Author's Info
   */
  static fetchAuthorInfo = (cy) => {
    cy.intercept(
      {
        method: 'POST',
        url: URL_ENDPOINTS.FETCH_AUTHOR_INFO
      },
      {
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwMDZlNzNiNWE4MTlmM2QzNmQ0ZmNjIiwidXNlcm5hbWUiOiJqb2huQHlvcG1haWwuY29tIiwiaWF0IjoxNjQ3NTUyNTI0fQ.Yjh5T16TRjytlpJ8l5gSRzKr-FWYtPVS_FTY1hAb2sM'
        }
      },
      MOCK_DATA.AUTHOR_INFO
    );
  };

  /**
   * This method fetches the Authors
   */
  static fetchAuthors = (cy) => {
    cy.intercept(
      {
        method: 'POST',
        url: URL_ENDPOINTS.FETCH_AUTHORS
      },
      {
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwMDZlNzNiNWE4MTlmM2QzNmQ0ZmNjIiwidXNlcm5hbWUiOiJqb2huQHlvcG1haWwuY29tIiwiaWF0IjoxNjQ3NTUyNTI0fQ.Yjh5T16TRjytlpJ8l5gSRzKr-FWYtPVS_FTY1hAb2sM'
        }
      },
      MOCK_DATA.AUTHOR_LIST
    );
  };
}
