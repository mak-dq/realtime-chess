import axios from './instance';

interface userData {
  fname: string;
  lname: string;
  username: string;
  age: number;
  email: string;
}

export const editDetails = async (userId: string, userData: userData) => {
  try {
    const response = await axios.patch(`player/${userId}`, userData);
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
