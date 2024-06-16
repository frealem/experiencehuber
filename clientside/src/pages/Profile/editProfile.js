import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import StyledInput from "../../components/input";
import MyButton from "../../components/myButton";
import Profile from "./component/profilePicture";
import { getCurrentUserApi } from "../../components/States/userIntegration/userApi";

const EditProfile = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [user, setUser] = useState(null);


  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const getUser = async () => {
      const userData = await getCurrentUserApi();
      setUser(userData);
    };
    getUser();
  }, [reset]);

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
            <Profile />
          </Box>
          {user? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6} marginTop={2} marginX={4}>
                <StyledInput
                  control={control}
                  name="name"
                  placeholder="Full name"
                  style={{ display: 'block' }}
                  defualtValue = {user.userName}
                />
              </Grid>
              <Grid item xs={12} md={6} marginTop={2} marginX={4}>
                <StyledInput
                  control={control}
                  name="username"
                  placeholder="Username"

                  style={{ display: 'block' }}
                />
              </Grid>
              <Grid item xs={12} md={6} marginTop={2} marginX={4}>
                <StyledInput
                  control={control}
                  name="address"
                  placeholder="Address"
                  style={{ display: 'block' }}
                />
              </Grid>
              <Grid item xs={12} md={6} marginTop={2} marginX={4}>
                <StyledInput
                  control={control}
                  name="bio"
                  placeholder="Bio"
                  style={{ display: 'block' }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                marginTop={2}
                marginX={4}
              >
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
          ):"loading..."}
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;