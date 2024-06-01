import React from "react";
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import MyButton from "../../components/myButton";
import StyledInput from "../../components/input";
import { useForm } from "react-hook-form";
const PasswordSecurity = () => {
  const { register, handleSubmit, control } = useForm();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <Box
      mt={10}
      marginLeft={!isMobile ? "400px" : "10px"}
      marginRight={isMobile ? "10px" : null}
      align="center"
    >
      <Box>
        <Typography
          variant="h4"
          align="center"
          fontWeight="400"
          color={theme.palette.secondary.main}
          marginBottom={3}
        >
          Change Password
        </Typography>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} marginTop={2}>
              <StyledInput
                control={control}
                name="newPassword"
                placeholder="New Password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} marginTop={2}>
              <StyledInput
                control={control}
                name="confirmPassword"
                placeholder="Confirm The New Password"
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              marginTop={2}
              align="center"
              marginLeft={!isMobile ? "-20px" : 0}
            >
              <MyButton
                type="submit"
                variant="contained"
                color="primary"
                width="300px"
              >
                Change Password
              </MyButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default PasswordSecurity;
