import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import { userContext } from '../Contexts/userContext';
import { useContext } from 'react';
import { deleteUser } from '../api/delete';
import { logoutUser } from '../api/logout';
import Cookies from 'js-cookie';
export default function deleteAccount() {
  // const { token, userId } = useContext(userContext);
  const token = Cookies.get('access-token');
  const userId = Cookies.get('user-id');
  // console.log('deleteResp> ', deleteUser(userId, token));
  const handleClick = () => {
    deleteUser(userId, token);
    logoutUser();
  };
  return (
    <Box className="d-flex" sx={{ height: '85vh' }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="320"
            image="user-delete.png"
            alt="green iguana"
          />
          <CardContent sx={{ flexDirection: 'column' }} className="d-flex">
            <Typography gutterBottom variant="h5" component="div">
              Delete Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Are you sure, you wanna delete your account?
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="d-flex">
          <Button onClick={handleClick} size="medium" color="error">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
