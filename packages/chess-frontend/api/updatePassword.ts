import { fetchDetails } from './fetchDetails';
import axios from './instance';

interface userData {
  password: string;
  newPassword: string;
  username: string;
}

export const updatePassword = async (userData, userId: string) => {
  const uname = await fetchDetails();
  const details: userData = {
    password: userData.oldPassword,
    username: uname.username,
    newPassword: userData.password,
  };
  try {
    const response = await axios.post(
      `player/${userId}/changePassword`,
      details
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
