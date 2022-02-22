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
}
