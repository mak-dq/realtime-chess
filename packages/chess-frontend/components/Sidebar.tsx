import { Box } from '@mui/material';
import LoginSignup from './LoginSignup';



const Sidebar = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '0',
        backgroundColor: 'black',
        height: '92vh',
        width: '15vw',
        padding:"30px"
      }}
    >
      <LoginSignup direction={"column"}/>
    </Box>
  );
};

export default Sidebar;
