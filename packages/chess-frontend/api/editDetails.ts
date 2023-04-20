import { API_URL } from './config';
import axios from 'axios';
import { userContext } from '../Contexts/userContext';
import { useContext } from 'react';

interface userData {
  fname: string;
  lname: string;
  username: string;
  age: number;
  email: string;
}

export const editDetails = async (
  token: string,
  userId: string,
  userData: userData
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'ngrok-skip-browser-warning': 'true',
  };
  try {
    const response = await axios.patch(
      `${API_URL}player/`,
      { ...userData, userId },
      {
        headers,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
