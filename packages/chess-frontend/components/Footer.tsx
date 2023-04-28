import { Stack, Typography } from '@mui/material';
// pages/404.tsx
export default function Footer() {
  return (
    <>
      <Stack  className='d-flex' sx={{ height:"40px",width:"100%", backgroundColor:"black",position:"absolute", bottom:"0%"}}>
        <Typography variant='subtitle1' color="white">Made with ❤️ at DQ-Labs</Typography>
      </Stack>
    </>
  );
}
