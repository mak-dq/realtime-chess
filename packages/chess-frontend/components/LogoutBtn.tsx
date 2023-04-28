import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '../api/logout';
import { userContext } from '../Contexts/userContext';
import { useContext } from 'react';
import Cookies from 'js-cookie';

import { useRouter } from 'next/router';

export default function LogoutBtn() {
  const router = useRouter();
  const { setToken, setUserId } = useContext(userContext);
  const token = Cookies.get('access-token');
  // const userId = Cookies.get('user-id')
  async function handleClick() {
    const res = await logoutUser();
    if (res instanceof Error) {
      console.log('debug: ', res.message);
      return;
    } else {
      Cookies.set('access-token', '');
      Cookies.set('user-id', '');
      setToken(Cookies.get('access-token'));
      setUserId(Cookies.get('user-id'));
      router.push({
        pathname: '/',
        query: { returnUrl: router.asPath },
      });
    }
  }
  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          color: 'white',
          borderColor: 'white',
          fontSize: '12px',
          width: '100%',
          height: '42px',
        }}
        variant="outlined"
        startIcon={<LogoutIcon />}
      >
        {'Logout'}
      </Button>
    </>
  );
}
