import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { userContext } from '../Contexts/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';

import Swal from 'sweetalert2';

import { updatePassword } from '../api/updatePassword';

const theme = createTheme();

interface details {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export default function updatePasswordPage() {
  const { userId } = useContext(userContext);
  const router = useRouter();
  const [details, setDetails] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const [oldPasswordError, setOldPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  function checkPassword(details: details) {
    if (details.oldPassword === '') {
      setOldPasswordError("Current password can't be empty");
    } else {
      setOldPasswordError('');
    }
    if (details.password === '') {
      setPasswordError("New password can't be empty");
      setConfirmPasswordError("Confirm Password can't be empty");
      document.getElementById('password').focus();
      return false;
    } else if (details.password !== details.confirmPassword) {
      setPasswordError("Passwords doesn't match");
      setConfirmPasswordError("Passwords doesn't match");
      document.getElementById('confirm-password').focus();
      return false;
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
      setOldPasswordError('');
      return true;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkPassword(details)) return;

    // console.log(details, type);
    let data: details;
    data = {
      oldPassword: details.oldPassword,
      password: details.password,
      confirmPassword: details.confirmPassword,
    };

    const res = await updatePassword(data, userId);

    let msg = 'something';
    if (res.response)
      msg = res.response.data.error
        ? res.response.data.error
        : res.response.data.message;
    // console.log('res :>> ', res);
    if (res instanceof Error) {
      // const msg = res.A.data.error;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: { container: 'margin-top' },
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'error',
        title: `${msg}`,
      });
      return;
    }

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: { container: 'margin-top' },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Password updated successfully',
    });

    router.push({
      pathname: '/',
      query: { returnUrl: router.asPath },
    });

    // console.log("1", userId, token);
    console.log('res:>>', res);

    setDetails({
      oldPassword: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // console.log('name, value :>> ', name, value);
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="d-flex"
        component="main"
        maxWidth="xs"
        sx={{
          margin: 'autu 0',
          marginTop: '20px',
          height: '500px',
          borderRadius: '10px',
          backgroundColor: theme.palette.grey[300],
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="oldPassword"
                  value={details.oldPassword}
                  label="Current Password"
                  error={oldPasswordError !== ''}
                  helperText={oldPasswordError !== '' ? oldPasswordError : ''}
                  onChange={(e) => handleChange(e)}
                  type="password"
                  id="old-password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={details.password}
                  label="New Password"
                  error={passwordError !== ''}
                  helperText={passwordError !== '' ? passwordError : ''}
                  onChange={(e) => handleChange(e)}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  value={details.confirmPassword}
                  label="Confirm New Password"
                  error={confirmPasswordError !== ''}
                  helperText={
                    confirmPasswordError !== '' ? confirmPasswordError : ''
                  }
                  onChange={(e) => handleChange(e)}
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
