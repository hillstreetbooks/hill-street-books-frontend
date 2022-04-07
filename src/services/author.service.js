import { Axios } from '../helpers';
import { API_ENDPOINTS } from '../constants/Strings';

/** @module AuthorService */
export default class AuthorService {
  /**
   * @function registerAuthor
   * @description This method inserts the author's details as a record in the database
   * @param {*} username The Author's EmailID
   * @param {*} name The Author's Name
   * @param {*} password The Author's Password
   * @param {*} confirm_password Re-enter the password
   * @param {*} isAdmin Is an Admin
   * @returns {String} Returns a message
   */
  static registerAuthor = async (
    username,
    name,
    password,
    confirm_password,
    isAdmin
  ) => {
    try {
      const response = await Axios.post(API_ENDPOINTS.REGISTER_AUTHOR, {
        username: username.toLowerCase(),
        name,
        password,
        confirm_password,
        isAdmin
      });
      return response.data;
    } catch (error) {
      console.error('Error - AuthorService -> registerAuthor : ', error);
    }
  };

  /**
   * @function login
   * @description This method validates the author's credentials
   * @param {*} username The Author's EmailID
   * @param {*} password The Author's Password
   * @param {*} remainLoggedIn Remain Logged In
   * @returns {String} Returns a message
   */
  static login = async (username, password, remainLoggedIn) => {
    try {
      const response = await Axios.post(API_ENDPOINTS.LOGIN, {
        username: username.toLowerCase(),
        password,
        remainLoggedIn
      });
      return response.data;
    } catch (error) {
      console.error('Error - AuthorService -> login : ', error);
    }
  };

  /**
   * @function retrievePassword
   * @description This method validates the author's email and sends a retrieve password link
   * @param {*} username The Author's EmailID
   * @returns {String} Returns a message
   */
  static retrievePassword = async (username) => {
    try {
      const response = await Axios.post(API_ENDPOINTS.FORGOT_PASSWORD, {
        username: username.toLowerCase()
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error - AuthorService -> retrievePassword : ', error);
    }
  };

  /**
   * @function resetPassword
   * @description This method resets the Author's Password
   * @param {*} userId The Author's unique ID in the database
   * @param {*} uniqueString Unique generated String
   * @param {*} password The Author's Password
   * @param {*} confirm_password Re-enter the password
   * @returns {String} Returns a message
   */
  static resetPassword = async (
    userId,
    uniqueString,
    password,
    confirm_password
  ) => {
    try {
      const response = await Axios.post(API_ENDPOINTS.RESET_PASSWORD, {
        userId,
        uniqueString,
        password,
        confirm_password
      });
      return response.data;
    } catch (error) {
      console.error('Error - AuthorService -> resetPassword : ', error);
    }
  };

  /**
   * @function fetchAuthorInfo
   * @description This method fetches the Author's Info
   * @param {string} username The Author's EmailID
   * @returns {object} Returns an object which has author's details
   */
  static fetchAuthorInfo = async (username, token) => {
    try {
      const response = await Axios.post(
        API_ENDPOINTS.FETCH_AUTHOR_INFO,
        {
          username
        },
        { headers: { 'x-access-token': token } }
      );
      return response.data;
    } catch (error) {
      console.error('Error - AuthorService -> fetchAuthorInfo : ', error);
    }
  };

  /**
   * @function updateAuthorInfo
   * @description This method updates the Author's Info
   * @param {string} username The Author's EmailID
   * @param {string} name The Author's name
   * @returns {object} Returns an object which has author's details
   */
  static updateAuthorInfo = async (username, name, token) => {
    try {
      const response = await Axios.post(
        API_ENDPOINTS.UPDATE_AUTHOR_INFO,
        {
          username,
          name
        },
        { headers: { 'x-access-token': token } }
      );
      return response.data;
    } catch (error) {
      console.error('Error - AuthorService -> updateAuthorInfo : ', error);
    }
  };
}
