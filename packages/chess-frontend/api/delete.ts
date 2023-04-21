import { API_URL } from './config';
import axios from 'axios';

export const deleteUser = async (userId: string, token: string) => {
  const headers = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(`${API_URL}player/${userId}`, {
      headers,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
