import { Axios } from '../helpers';
import { API_ENDPOINTS } from '../constants/Strings';

/** @module AuthorContentService */
export default class AuthorContentService {
  /**
   * @function updateContent
   * @description This method inserts the author's details as a record in the database
   * @param {String} username The Author's EmailID
   * @param {*} author_details The Author's Details
   * @param {*} social_links The Author's Social Links
   * @param {*} books The Author's Books
   * @param {*} videos Array of Youtube links
   * @returns {String} Returns a message
   */
  static updateContent = async (
    username,
    author_details,
    social_links,
    books,
    videos,
    token
  ) => {
    try {
      const response = await Axios.post(
        API_ENDPOINTS.UPDATE_AUTHOR_CONTENT,
        {
          username: username.toLowerCase(),
          author_details,
          social_links,
          books,
          videos
        },
        { headers: { 'x-access-token': token } }
      );
      return response.data;
    } catch (error) {
      console.error('Error - AuthorContentService -> updateContent : ', error);
    }
  };

  /**
   * @function fetchContent
   * @description This method inserts the author's details as a record in the database
   * @param {String} username The Author's EmailID
   * @param {String} token The Author's token
   * @returns {String} Returns a message
   */
  static fetchContent = async (username, token) => {
    try {
      const response = await Axios.post(
        API_ENDPOINTS.FETCH_AUTHOR_CONTENT,
        {
          username: username.toLowerCase()
        },
        { headers: { 'x-access-token': token } }
      );
      return response.data;
    } catch (error) {
      console.error('Error - AuthorContentService -> fetchContent : ', error);
    }
  };
}
