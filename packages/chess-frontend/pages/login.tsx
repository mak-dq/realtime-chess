import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { login } from '../api/login';
import { register } from '../api/register';

const theme = createTheme();

interface details {
  usernameOrEmail: string;
  password: string;
}

export default function Register() {
  const [details, setDetails] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [usernameOrEmailError, setUsernameOrEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function checkEmail(email: string) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) return true;
    else return false;
  }

  function checkUsernameOrEmail(usernameOrEmail: string) {
    if (usernameOrEmail === '') {
      setUsernameOrEmailError('Username or Email is required');
      document.getElementById('username').focus();
      return false;
    } else {
      setUsernameOrEmailError('');
      return true;
    }
  }

  function checkPassword(details: details) {
    if (details.password === '') {
      setPasswordError("Password can't be empty");
      document.getElementById('password').focus();
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let type: string;
    if (!checkUsernameOrEmail(details.usernameOrEmail)) return;

    type = checkEmail(details.usernameOrEmail) ? 'email' : 'username';

    if (!checkPassword(details)) return;

    // console.log(details, type);
    let data;
    if (type === 'email') {
      data = {
        email: details.usernameOrEmail,
        password: details.password,
      };
    } else {
      data = {
        username: details.usernameOrEmail,
        password: details.password,
      };
    }
    console.log(login(data));

    setDetails({
      usernameOrEmail: '',
      password: '',
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
          height: '460px',
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
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
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
                  autoComplete="user-name"
                  name="usernameOrEmail"
                  required
                  value={details.usernameOrEmail}
                  fullWidth
                  error={usernameOrEmailError !== ''}
                  helperText={
                    usernameOrEmailError !== '' ? usernameOrEmailError : ''
                  }
                  onChange={(e) => handleChange(e)}
                  id="username"
                  label="Username or Email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={details.password}
                  label="Password"
                  error={passwordError !== ''}
                  helperText={passwordError !== '' ? passwordError : ''}
                  onChange={(e) => handleChange(e)}
                  type="password"
                  id="password"
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
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  New user? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
