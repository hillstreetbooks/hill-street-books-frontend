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

  /**
   * @function publishAuthorContentPage
   * @description This method publishes the author content
   * @param {String} _id Author's ID
   * @param {String} message Admin's message to the author
   * @returns {Array} Returns an array of Authors
   */
  static publishAuthorContentPage = async (_id, message, token) => {
    try {
      const response = await Axios.post(
        API_ENDPOINTS.PUBLISH_AUTHOR_PAGE,
        { _id, message },
        { headers: { 'x-access-token': token } }
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error - AdminService -> publishAuthorContentPage : ',
        error
      );
    }
  };

  /**
   * @function unpublishAuthorContentPage
   * @description This method unpublishes the author content
   * @param {String} _id Author's ID
   * @param {String} message Admin's message to the author
   * @returns {Array} Returns an array of Authors
   */
  static unpublishAuthorContentPage = async (_id, message, token) => {
    try {
      const response = await Axios.post(
        API_ENDPOINTS.UNPUBLISH_AUTHOR_PAGE,
        { _id, message },
        { headers: { 'x-access-token': token } }
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error - AdminService -> unpublishAuthorContentPage : ',
        error
      );
    }
  };

  /**
   * @function removeAuthorContentPage
   * @description This method removes the author content
   * @param {String} _id Author's ID
   * @param {String} message Admin's message to the author
   * @returns {Array} Returns an array of Authors
   */
  static removeAuthorContentPage = async (_id, message, token) => {
    try {
      const response = await Axios.post(
        API_ENDPOINTS.REMOVE_AUTHOR_PAGE,
        { _id, message },
        { headers: { 'x-access-token': token } }
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error - AdminService -> removeAuthorContentPage : ',
        error
      );
    }
  };

  /**
   * @function removeAuthorContentPage
   * @description This method fetches all the admin notifications
   * @returns {Array} Returns an array of Notifications
   */
  static fetchAdminNotifications = async (token) => {
    try {
      const response = await Axios.post(
        API_ENDPOINTS.FETCH_NOTIFICATIONS,
        {},
        { headers: { 'x-access-token': token } }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error - AdminService -> fetchAdminNotifications : ',
        error
      );
      return null;
    }
  };

  /**
   * @function removeAdminNotifications
   * @description This method removes the notification once it is viewed by the admin
   * @param {String} username Author's Username (Email)
   * @returns {Array} Returns an array of Notifications
   */
  static removeAdminNotifications = async (username, token) => {
    try {
      const response = await Axios.post(
        API_ENDPOINTS.REMOVE_NOTIFICATIONS,
        {
          username
        },
        { headers: { 'x-access-token': token } }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error - AdminService -> removeAdminNotifications : ',
        error
      );
      return null;
    }
  };
}
