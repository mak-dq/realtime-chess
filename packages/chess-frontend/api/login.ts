import { API_URL } from './config';
import axios from 'axios';

interface loginEmailData {
  email: string;
  password: string;
}

interface loginUsernameData {
  username: string;
  password: string;
}

export const login = async (loginData: loginEmailData | loginUsernameData) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.post(`${API_URL}auth/login/`, loginData, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
