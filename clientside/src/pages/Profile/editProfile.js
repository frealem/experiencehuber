import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import StyledInput from "../../components/input";
import MyButton from "../../components/myButton";
import Profile from "./component/profilePicture";
import { getCurrentUserApi } from "../../components/States/userIntegration/userApi";
import { TextField, Button } from '@mui/material';

const EditProfile = () => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await getCurrentUserApi();
      setUser(userData);
      console.log(userData);
      if(userData.profilePictuerURL){
        setProfilePicture(`http://localhost:5000/uploads/1718306762845.jpg`)
      }
      // Set the initial values of the form fields
      setValue('username', userData.userName);
      setValue('fullname', userData.fullName);
      setValue('email', userData.email);
      setValue('bio', userData.bio);
    };
    getUser();
  }, [reset, setValue]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      mt={10}
      marginLeft={!isMobile ? "400px" : "10px"}
      marginRight={isMobile ? "10px" : null}
    >
      <Box display="block" justifyContent="center" sx={{ minHeight: "100vh" }}>
        <Box>
          <Box align="center">
            <Typography
              variant="h4"
              align="center"
              fontWeight="400"
              color={theme.palette.secondary.main}
              marginBottom={3}
            >
              Edit Profile
            </Typography>
            <Profile profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
          </Box>
          {user ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6} marginTop={2} marginX={4}>
                  <TextField
                    {...register('fullname')}
                    placeholder="Full name"
                    style={{ display: 'block' }}
                  />
                </Grid>
                <Grid item xs={12} md={6} marginTop={2} marginX={4}>
                  <TextField
                    {...register('username')}
                    placeholder="Username"
                    style={{ display: 'block' }}
                  />
                </Grid>
                <Grid item xs={12} md={6} marginTop={2} marginX={4}>
                  <TextField
                    {...register('email')}
                    placeholder="Address"
                    style={{ display: 'block' }}
                  />
                </Grid>
                <Grid item xs={12} md={6} marginTop={2} marginX={4}>
                  <TextField
                    {...register('bio')}
                    placeholder="Bio"
                    style={{ display: 'block' }}
                  />
                </Grid>
                <Grid item xs={12} md={6} marginTop={2} marginX={4}>
                  <MyButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    margin={4}
                    width="250px"
                  >
                    Submit
                  </MyButton>
                </Grid>
              </Grid>
            </form>
          ) : (
            "loading..."
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;