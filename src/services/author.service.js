import { Axios } from '../helpers';
import { API_ENDPOINTS } from '../constants/Strings';

export default class AuthorService {
  /**
   * Inserts the author in to the database
   * @param author_details
   */
  static registerAuthor = async (author_details) => {
    try {
      const { username, name, password } = author_details;
      const response = await Axios.post(API_ENDPOINTS.REGISTER_AUTHOR, {
        user: {
          username: username.toLowerCase(),
          name,
          password
        }
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error - AuthorService -> registerAuthor : ', error);
    }
  };

  /**
   * Validates the author's credentials
   * @param login_details
   */
  static login = async ({ username, password }) => {
    try {
      const response = await Axios.post(API_ENDPOINTS.LOGIN, {
        user: {
          username: username.toLowerCase(),
          password
        }
      });
      console.log(response);
      return (
        response.data ||
        'Oops, Something went wrong! Please contact the administrator.'
      );
    } catch (error) {
      console.error('Error - AuthorService -> login : ', error);
    }
  };
}
