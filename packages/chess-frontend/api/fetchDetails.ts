import { API_URL } from './config';
import axios from 'axios';

export const fetchDetails = async (token: string, userId: string) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'ngrok-skip-browser-warning': 'true',
  };
  try {
    const response = await axios.get(`${API_URL}player/${userId}`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.error('HI', err);
    return err;
  }
};
