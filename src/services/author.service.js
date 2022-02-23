import { Axios } from '../helpers';
import { API_ENDPOINTS } from '../constants/Strings';

export default class AuthorService {
  /**
   * Inserts the author in to the database
   * @param author_details
   */
  static registerAuthor = async (author_details) => {
    try {
      const { username, name, password, confirm_password } = author_details;
      const response = await Axios.post(API_ENDPOINTS.REGISTER_AUTHOR, {
        username: username.toLowerCase(),
        name,
        password,
        confirm_password
      });
      return response.data;
    } catch (error) {
      console.error('Error - AuthorService -> registerAuthor : ', error);
    }
  };

  /**
   * Validates the author's credentials
   * @param login_details
   */
  static login = async ({ username, password, remainLoggedIn }) => {
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
   * Validates the author's email and sends a retrieve password link
   * @param username
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
   * Reset Author's Password
   * @param userId
   * @param uniqueString
   * @param password
   * @param confirm_password
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
}
