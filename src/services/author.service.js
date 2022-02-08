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
          username,
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
}
