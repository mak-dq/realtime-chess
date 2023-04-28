import Cookies from 'js-cookie';
import axios from './instance';

export const fetchDetails = async () => {
  try {
    const response = await axios.get(`player/${Cookies.get('user-id')}`);
    return response.data;
  } catch (err) {
    console.error('HI', err);
    return err;
  }
};
