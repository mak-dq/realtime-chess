import { API_URL } from './config';
import axios from 'axios';

interface userData {
  fname: string;
  lname: string;
  username: string;
  age: number;
  email: string;
  password: string;
}

export const register = async (userData: userData) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.post(API_URL, userData, { headers });
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
