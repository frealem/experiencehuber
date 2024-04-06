import React from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import StyledInput from '../../components/input';
import MyButton from '../../components/myButton';
import UserImage from '../../components/userImage';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Profile from './component/profilePicture';

const EditProfile = () => {
  const { register, handleSubmit, control } = useForm();
const theme=useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <Box
      display="block"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
      
    >
      <Box>
      <Box align="center">
      <Typography variant="h4" align="center" fontWeight="400" color={theme.palette.secondary.main}marginBottom={3}>
          Edit Profile
        </Typography>
     <Profile/>
      </Box>
      
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} marginTop={2}>
              <StyledInput
                control={control}
                name="name"
                placeholder="Full name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} marginTop={2}>
              <StyledInput
                control={control}
                name="username"
                placeholder="Username"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} marginTop={2}>
              <StyledInput
                control={control}
                name="address"
                placeholder="Address"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} marginTop={2}>
              <StyledInput
                control={control}
                name="bio"
                placeholder="Bio"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} marginTop={2} align="center" marginLeft={!isMobile ? "-20px":0}>
              <MyButton type="submit" variant="contained" color="primary" width='300px'>
                Submit
              </MyButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfile;