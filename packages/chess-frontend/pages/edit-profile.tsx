import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userContext } from '../Contexts/userContext';
import { useContext } from 'react';

import { fetchDetails } from '../api/fetchDetails';
import { editDetails } from '../api/editDetails';
import { useRouter } from 'next/router';

import Swal from 'sweetalert2';

const theme = createTheme();

interface details {
  firstName: string;
  lastName: string;
  username: string;
  age: string;
  email: string;
}

interface userData {
  fname: string;
  lname: string;
  username: string;
  age: number;
  email: string;
}

export default function editProfile() {
  const router = useRouter();
  const { userId } = useContext(userContext);

  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    age: '',
    email: '',
  });

  let res: userData;
  useEffect(() => {
    async function fetchDet() {
      res = await fetchDetails();
      console.log(res);
      for (const item of Object.entries(res)) {
        if (item[0] === 'fname') {
          setDetails((prevDetails) => ({
            ...prevDetails,
            firstName: item[1],
          }));
        } else if (item[0] === 'lname') {
          setDetails((prevDetails) => ({
            ...prevDetails,
            lastName: item[1],
          }));
        } else {
          setDetails((prevDetails) => ({
            ...prevDetails,
            [item[0]]: item[1],
          }));
        }
      }
    }
    fetchDet();
  }, []);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [emailError, setEmailError] = useState('');

  function checkEmail(email: string) {
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) return true;
    else return false;
  }

  function checkNames(details: details) {
    if (details.firstName === '') {
      setFirstNameError('First name is required');
      document.getElementById('firstName').focus();
      return false;
    } else {
      setFirstNameError('');
    }

    if (details.lastName === '') {
      setLastNameError('Last name is required');
      document.getElementById('lastName').focus();
      return false;
    } else {
      setLastNameError('');
    }

    if (details.username === '') {
      setUsernameError('Username is required');
      document.getElementById('username').focus();
      return false;
    } else {
      setUsernameError('');
      return true;
    }
  }

  function checkAge(age: string) {
    if (parseInt(age) < 9 || parseInt(age) > 99 || age === '') {
      setAgeError('Not a legal age to play');
      document.getElementById('age').focus();
      return false;
    } else {
      setAgeError('');
      return true;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkNames(details)) return;

    if (!checkAge(details.age)) return;

    if (!checkEmail(details.email)) {
      setEmailError('Please enter a valid email');
      if (document.activeElement !== document.getElementById('age')) {
        document.getElementById('email').focus();
      }
      return;
    } else {
      setEmailError('');
    }

    const data: userData = {
      fname: details.firstName,
      lname: details.lastName,
      age: parseInt(details.age),
      username: details.username,
      email: details.email,
    };

    // api call
    const res = await editDetails(userId, data);
    if (res instanceof Error) {
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
        title: 'Unexpected error',
      });
      return;
    }

    // console.log('res :>> ', res);

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
      title: 'Updated successfully',
    });

    router.push({
      pathname: '/',
      query: { returnUrl: router.asPath },
    });

    setDetails({
      firstName: '',
      lastName: '',
      username: '',
      age: '',
      email: '',
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
            <SettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
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
                  disabled
                  id="email"
                  value={details.email}
                  type="email"
                  label="Email Address"
                  error={emailError !== ''}
                  helperText={emailError !== '' ? emailError : ''}
                  onChange={(e) => handleChange(e)}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  value={details.firstName}
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
                  value={details.lastName}
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
                  disabled
                  value={details.username}
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
                  value={details.age}
                  type="number"
                  error={ageError !== ''}
                  helperText={ageError !== '' ? ageError : ''}
                  onChange={(e) => handleChange(e)}
                  name="age"
                  autoComplete="age"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Details
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
