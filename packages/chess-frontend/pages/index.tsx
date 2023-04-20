// import styles from './index.module.css';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';
import { useEffect } from 'react';
import { userContext } from '../Contexts/userContext';
import { useContext } from 'react';

export function Index() {
  // const {userId} = useContext(userContext)
  useEffect(() => {
    console.log('we are home');
  }, []);
  return (
    <Container sx={{ margin: '0', padding: '0 !important', height: '90vh' }}>
      <Stack direction="row">
        <Sidebar />
        <Container
          sx={{
            position: 'absolute',
            left: '15vw',
            height: '92vh',
            width: '85vw',
          }}
        >
          <Stack
            sx={{ margin: '50px 30px' }}
            direction="row"
            className="d-flex"
          >
            <Image
              width={400}
              height={400}
              src="/../public/standardboard.png"
              alt=""
            />
            <Box
              className="d-flex"
              sx={{
                flexDirection: 'column',
                color: 'white',
                height: '100px',
                width: '500px',
                margin: '0',
              }}
            >
              <Typography
                sx={{
                  fontSize: '30px !important',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
                variant="body1"
              >
                India's #1
                <br /> Chess Platform
              </Typography>
              <Button
                variant="contained"
                sx={{
                  '&:hover': {
                    backgroundColor: '#1d891d',
                  },
                  backgroundColor: '#0e7a0e',
                  marginTop: '10px',
                }}
                size="small"
              >
                Start Playing
              </Button>
            </Box>
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
}

export default Index;
