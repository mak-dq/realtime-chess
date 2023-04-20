import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import { ReactNode } from 'react';

interface MenuButtonType {
  text: string;
  icon: ReactNode;
  route: string;
}

export const MenuButtons: MenuButtonType[] = [
  { text: 'Profile', icon: <AccountCircleIcon />, route: '/profile' },
  { text: 'Edit Profile', icon: <EditRoundedIcon />, route: '/edit-profile' },
  { text: 'Delete Account', icon: <DeleteRoundedIcon />, route: '/delete-account' },
  { text: 'Update Password', icon: <KeyIcon />, route: '/update-password'},
  { text: 'Logout', icon: <LogoutIcon />, route: '/update-password'},
];
