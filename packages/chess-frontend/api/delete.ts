import axios from './instance';

export const deleteUser = async (userId: string) => {
  // console.log('userId :>> ', userId);
  try {
    const response = await axios.delete(`player/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
