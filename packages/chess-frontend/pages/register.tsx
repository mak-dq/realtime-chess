import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Register() {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (details.firstName === '') {
      setFirstNameError('First name is required');
      document.getElementById('firstName').focus();
      return;
    } else {
      setFirstNameError('');
    }

    if (details.lastName === '') {
      setLastNameError('Last name is required');
      document.getElementById('lastName').focus();
      return;
    } else {
      setLastNameError('');
    }

    if (details.username === '') {
      setUsernameError('Username is required');
      document.getElementById('username').focus();
      return;
    } else {
      setUsernameError('');
    }

    if (
      parseInt(details.age) < 9 ||
      parseInt(details.age) > 99 ||
      details.age === ''
    ) {
      setAgeError('Not a legal age to play');
      document.getElementById('age').focus();
    } else {
      setAgeError('');
    }

    if (!checkEmail(details.email)) {
      setEmailError('Please enter a valid email');
      if (document.activeElement !== document.getElementById('age')) {
        document.getElementById('email').focus();
      }
    } else {
      setEmailError('');
    }

    if (details.password !== details.confirmPassword) {
      setPasswordError("Passwords doesn't match");
      setConfirmPasswordError("Passwords doesn't match");
      if (
        document.activeElement !== document.getElementById('email') &&
        document.activeElement !== document.getElementById('age')
      ) {
        document.getElementById('password').focus();
      }
      return;
    } else if (details.password === '') {
      setPasswordError("Password can't be empty");
      setConfirmPasswordError("Confirm Password can't be empty");
      if (
        document.activeElement !== document.getElementById('email') &&
        document.activeElement !== document.getElementById('age')
      ) {
        document.getElementById('password').focus();
      }
      return;
    } else {
      setPasswordError('');   
      setConfirmPasswordError('');   
    }
    console.log(details);
  };

  function checkEmail(email) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) return true;
    else return false;
  }

  const handleChange = (e) => {
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
          height: '660px',
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstNameError !== ''}
                  helperText={firstNameError !== '' ? firstNameError : ''}
                  onChange={(e) => handleChange(e)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  error={lastNameError !== ''}
                  helperText={lastNameError !== '' ? lastNameError : ''}
                  onChange={(e) => handleChange(e)}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="user-name"
                  name="username"
                  required
                  fullWidth
                  error={usernameError !== ''}
                  helperText={usernameError !== '' ? usernameError : ''}
                  onChange={(e) => handleChange(e)}
                  id="username"
                  label="Username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  type="number"
                  // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  error={ageError !== ''}
                  helperText={ageError !== '' ? ageError : ''}
                  onChange={(e) => handleChange(e)}
                  name="age"
                  autoComplete="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  error={emailError !== ''}
                  helperText={emailError !== '' ? emailError : ''}
                  onChange={(e) => handleChange(e)}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
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
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  error={confirmPasswordError !== ''}
                  helperText={confirmPasswordError !== '' ? confirmPasswordError : ''}
                  onChange={(e) => handleChange(e)}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {/* <Grid>
              <p style={{ fontSize: '14px', color: 'red', textAlign: 'right' }}>
                {error !== '' && error}
              </p>
            </Grid> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
