import React from "react";
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import MyButton from "../../components/myButton";
import StyledInput from "../../components/input";
import { useForm } from "react-hook-form";
import { changePasswordApi } from "../../components/States/userIntegration/userApi";
const PasswordSecurity = () => {
  const { register, handleSubmit, control } = useForm();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const onSubmit = async(data) => {
    // Handle form submission logic here
    const response = await changePasswordApi(data);
    console.log(response);
  };

  return (
    <Box
  mt={10}
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '100%',
    padding: '0 16px',
    [theme.breakpoints.up('md')]: {
      padding: 0,
      maxWidth: '80%',
      marginLeft: '400px',
    },
  }}
>
  <Box>
    <Typography
      variant="h4"
      align="center"
      fontWeight="400"
      color={theme.palette.secondary.main}
      mb={4}
    >
      Change Password
    </Typography>
  </Box>
  <Box
    display="flex"
    flexDirection="column"
    align="center"
    width="100%"
    maxWidth="500px"
  >
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          '& > *': {
            mb: 3,
          mr:1
          },
        }}
      >
        <StyledInput
          control={control}
          name="currentPassword"
          placeholder="Current Password"
          fullWidth
        />
        <StyledInput
          control={control}
          name="newPassword"
          placeholder="New Password"
          fullWidth
        />
        <StyledInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm The New Password"
          fullWidth
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <MyButton
            type="submit"
            variant="contained"
            color="primary"
            width="250px"
          >
            change password
          </MyButton>
        </Box>
      </Box>
    </form>
  </Box>
</Box>
  );
};

export default PasswordSecurity;
