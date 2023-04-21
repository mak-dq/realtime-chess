import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DataUsageIcon from '@mui/icons-material/DataUsage';

import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

import { fetchDetails } from '../api/fetchDetails';

export default function Profile() {
  const [details, setDetails] = React.useState({
    fname: '',
    lname: '',
    username: '',
    age: '',
    email: '',
  });

  async function fetchUser() {
    const res = await fetchDetails();
    console.log(res);
    for (const item of Object.entries(res)) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        [item[0]]: item[1],
      }));
    }
  }
  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Box
        className="d-flex"
        sx={{
          height: '85vh',
          marginTop: '30px',
          alignItems: 'flex-start !important',
        }}
      >
        <List
          sx={{
            width: '100%',
            maxWidth: 440,
            bgcolor: 'background.paper',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BadgeIcon />
              </Avatar>
            </ListItemAvatar>
            <strong>Name:&nbsp;&nbsp;&nbsp;</strong>
            <ListItemText primary={`${details.fname} ${details.lname}`} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <strong>Username:&nbsp;&nbsp;&nbsp;</strong>
            <ListItemText primary={`${details.username}`} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DataUsageIcon />
              </Avatar>
            </ListItemAvatar>
            <strong>Age:&nbsp;&nbsp;&nbsp;</strong>
            <ListItemText primary={`${details.age}`} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AlternateEmailIcon />
              </Avatar>
            </ListItemAvatar>
            <strong>Email:&nbsp;&nbsp;&nbsp;</strong>
            <ListItemText primary={`${details.email}`} />
          </ListItem>
        </List>
      </Box>
    </>
  );
}
