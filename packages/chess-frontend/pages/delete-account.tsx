import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';

export default function deleteAccount() {
  return (
    

    <Box className='d-flex' sx={{height:"85vh",}}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="320"
            image="user-delete.png"
            alt="green iguana"
          />
          <CardContent sx={{flexDirection:"column"}} className='d-flex'>
            <Typography gutterBottom variant="h5" component="div">
              Delete Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
             Are you sure, you wanna delet your account 
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className='d-flex'>
          <Button size="medium" color="error">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
