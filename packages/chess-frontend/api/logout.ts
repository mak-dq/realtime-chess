import Cookies from 'js-cookie';
// import { API_URL } from './config';
import axios from './instance';

export const logoutUser = async () => {
  try {
    const response = await axios.post(`auth/logout`);
    console.log('logged-out', response.data);
    return response.data;
  } catch (err) {
    console.error('logoutError', err);
    return err;
  }
};
