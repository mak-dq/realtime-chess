import { Box } from '@mui/material';
import LoginSignup from './LoginSignup';
import UserSideMenu from './UserSideMenu';


const Sidebar = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '0',
        backgroundColor: 'black',
        height: '92vh',
        width: '16vw',
        padding:"22px"
      }}
    >
      <LoginSignup direction={"column"}/>
      <UserSideMenu/>
    </Box>
  );
};

export default Sidebar;
