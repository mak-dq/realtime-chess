import { Button, Stack } from '@mui/material';
// import Link from 'next/link';
import { userContext } from '../Contexts/userContext';
import { useContext } from 'react';
import MenuButton from './MenuButton';
import { MenuButtons } from './Constants';
import LogoutBtn from './LogoutBtn';

export default function UserSideMenu() {
  const { userId } = useContext(userContext);
  return (
    <>
      {' '}
      {userId !== '' && (
        <Stack gap={2}>
          {MenuButtons.map((item) => {
            return (
              <MenuButton
                key={item.text}
                text={item.text}
                icon={item.icon}
                route={item.route}
              />
            );
          })}
          <LogoutBtn />
        </Stack>
      )}
    </>
  );
}
