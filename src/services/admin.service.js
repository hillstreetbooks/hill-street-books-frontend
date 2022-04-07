import { Axios } from '../helpers';
import { API_ENDPOINTS } from '../constants/Strings';

/** @module AdminService */
export default class AdminService {
  /**
   * @function fetchAuthors
   * @description This method fetches all the authors registered in the system
   * @returns {Array} Returns an array of Authors
   */
  static fetchAuthors = async (token) => {
    try {
      const response = await Axios.post(
        API_ENDPOINTS.FETCH_AUTHORS,
        {},
        { headers: { 'x-access-token': token } }
      );

      return response.data;
    } catch (error) {
      console.error('Error - AdminService -> fetchAuthors : ', error);
    }
  };
}
