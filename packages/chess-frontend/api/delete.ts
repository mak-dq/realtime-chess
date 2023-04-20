import { API_URL } from './config';
import axios from 'axios';

export const login = async (userId : string) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.post(`${API_URL}player/`, userId, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
