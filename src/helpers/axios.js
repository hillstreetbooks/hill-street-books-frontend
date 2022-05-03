import axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_BACKEND_BASE_URL ||
  'https://hill-street-books-backend.herokuapp.com/api';
const Axios = axios.create({
  baseURL: BASE_URL
});

export default Axios;
