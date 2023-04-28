import Cookies from 'js-cookie';
import { API_URL } from './config';
import axios from './instance';

export const fetchDetails = async () => {
  try {
    const response = await axios.get(
      `player/${Cookies.get('user-id')}`
    );
    return response.data;
  } catch (err) {
    console.error('HI', err);
    return err;
  }
};
