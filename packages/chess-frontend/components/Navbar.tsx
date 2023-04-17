import { Stack } from '@mui/material';
import LoginSignup from './LoginSignup';
import Link from 'next/link';

const Navbar = () => {
  return (
    <Stack
      sx={{
        padding: '0 45px',
        height: '60px',
        // backgroundColor: '#2a6014',
        backgroundImage: "linear-gradient( 109.6deg,  rgba(61,131,97,1) 11.2%, rgba(28,103,88,1) 91.1% );",
        // width: '100vw !important',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      direction="row"
    >
      <Link href="/">
        <h1 style={{ fontSize: '26px', color: 'white' }}>Realtime Chess</h1>
      </Link>
      <LoginSignup direction={'row'} />
    </Stack>
  );
};
export default Navbar;