import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import StyledInput from '../../components/input';
const EditProfile = () => {
  
    const { register, handleSubmit ,control} = useForm();
  
    const onSubmit = (data) => {
      // Handle form submission logic here
      console.log(data);
    };
    return (<Box>
    <Typography variant='h3' align='center'>Edit Profile</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6} marginTop={2}>
      <StyledInput
        control={control}
        name="name"
        placeholder="Full name"
        fullWidth
      />
            <StyledInput
        control={control}
        name="username"
        placeholder="Username"
        fullWidth
      />
            <StyledInput
        control={control}
        name="username"
        placeholder="Username"
        fullWidth
      />
           <StyledInput
        control={control}
        name="address"
        placeholder="Address"
        fullWidth
      />
      <StyledInput
        control={control}
        name="bio"
        placeholder="Address"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      </Box>
    );
}

export default EditProfile