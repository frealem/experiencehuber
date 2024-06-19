import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import * as yup from "yup";
import { useFormik } from "formik";
import { loginUser, registerUser} from "../components/States/authIntegration/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StyledInputWithValidation from "../components/input";
import { useTheme } from "@emotion/react";

// Client-side validation schema
const registerSchema = yup.object().shape({
  fullName: yup.string()
  .required('Full name is required')
  .min(3, 'Full name must be at least 3 characters')
  .max(20, 'Full name must be at most 20 characters'),
  password: yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
  .matches(/[\d]+/, 'Password must contain at least one digit'),
  email: yup.string()
  .required('Unused Email is required')
    .email('Invalid email address'),
  
  
  userName: yup.string()
  .required('username is required')
  .min(5, 'username must be at least 5 characters')
  .max(20, 'username must be at most 20 characters'),
  confirmPassword: yup.string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const initialValuesSignup = {
  email: "",
  phone: "",
  userName: "",
  fullName: "",
  password: "",
};

const AuthPage = () => {
 const [open, setOpen] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const { loading,type,error ,accessToken} = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme=useTheme();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(accessToken){
      navigate('/')
    }
    // if (accessToken) {
    //   console.log(type)
    //   if(type===1){
    //   navigate('/');
    //   }
    
    // }
    // else if(accessToken && type===3){
    //   navigate('/overview');
    // }
    // else if(accessToken && type===2){
    //   navigate('/reportmanagement');
    // }
  }, [accessToken]);


  // useEffect(() => {
  //   if (error) {
  //     // Handle the error, e.g., display a notification
  //     console.error(error);
  //   }
  // }, [error]);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    navigate('/')
  };

  const handleSignUpClick = () => {
    setSignUp(true);
  };

  const handleSignInClick = () => {
    setSignUp(false);
  };
 
  const submitLogin = async (values) => {
    setIsLoading(true);
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            const { email, password } = values;
            const formData = { email, password };
            dispatch(loginUser(formData));
            console.log('Performing login or registration...');
            resolve();
          }, 2000);
        });
      } 
      catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
  
  const submitRegister = async (values) => {
    setIsLoading(true);
    
  
    try {
      const { email, password, fullName, userName} = values;
          const formData = { email, password, fullName, userName};
          await dispatch(registerUser(formData));
          console.log("Successful registration");
      await new Promise((resolve) => {
        setTimeout(() => {
          dispatch(loginUser(formData));
          console.log("Successful login");
          navigate('/')
          resolve();
        }, 2000);
      });
    } 
    catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // Formik configuration
  const formik = useFormik({
    initialValues: signUp ? initialValuesSignup : initialValuesLogin,
    validationSchema: signUp ? registerSchema : loginSchema,
    onSubmit: async (values) => {
      try {
        // Validate the form fields
        await formik.validateForm();
  
        // Check if there are any errors
        if (Object.keys(formik.errors).length > 0) {
          // There are validation errors, do not submit the form
          return;
        }
  
        // All validation checks passed, proceed with form submission
        signUp ? await submitRegister(values) : await submitLogin(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    },
  });
  return (
    <div style={{ textAlign: "center" }}>
  <Dialog
    open={open}
    onClose={closeDialog}
    maxWidth="sm"
    PaperProps={{
      sx: {
        borderRadius: 10,
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 600,
        backgroundColor: "#C2A8F9", // Light purple theme
        color: "#FFFFFF", // White text color
        '&::-webkit-scrollbar': {
          display: 'none', // Hide the scrollbar
        },
        '& .MuiDialogTitle-root': {
          backgroundColor: '#9E7FF1', // Darker purple for the title
          padding: '16px 24px',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        '& .MuiDialogContent-root': {
          padding: '24px',
        },
        '& .MuiTextField-root': {
          '& .MuiInputBase-root': {
            backgroundColor: '#FFFFFF', // White background for text fields
            color: '#C2A8F9', // Light purple text color
            '&:hover': {
              backgroundColor: '#E6E0F5', // Lighter purple hover background
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF', // White focused background
            },
          },
          '& .MuiInputLabel-root': {
            color: '#C2A8F9', // Light purple label color
          },
          '& .MuiFormHelperText-root': {
            color: '#FFFFFF', // White helper text color
          },
        },
        '& .MuiButton-root': {
          backgroundColor: '#9E7FF1', // Darker purple button background
          color: '#FFFFFF', // White button text color
          '&:hover': {
            backgroundColor: '#8562D6', // Even darker purple hover background
          },
        },
      },
    }}
    disableScrollbar
  >
    <DialogTitle>
      Sign In
      <IconButton
        color="error"
        variant="contained"
        onClick={closeDialog}
        style={{ float: "right" }}
      >
        <CloseOutlinedIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Stack spacing={2} margin={2}>
          {signUp ? (
            <React.Fragment>
              <TextField
                type="text"
                placeholder="Full Name"
                variant="outlined"
                {...formik.getFieldProps('fullName')}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />

              <TextField
                type="text"
                placeholder="Username"
                variant="outlined"
                {...formik.getFieldProps('userName')}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
              />


              <TextField
                type="email"
                placeholder="Email"
                variant="outlined"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                type="password"
                placeholder="Password"
                variant="outlined"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              <TextField
                type="password"
                placeholder="Confirm Password"
                variant="outlined"
                {...formik.getFieldProps('confirmPassword')}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <TextField
                type="text"
                placeholder="Email"
                variant="outlined"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                type="password"
                placeholder="Password"
                variant="outlined"
                {...formik.getFieldProps("password")}
                error={formik.touched.password && formik.errors.password}
                helperText={
                  formik.touched.password && formik.errors.password
                }
              />
            </React.Fragment>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            endIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {signUp ? "Sign Up" : "Sign In"}
          </Button>
          <Box>
            {!signUp ? (
              <Typography onClick={handleSignUpClick}>
                I don't have an account, Sign Up
              </Typography>
            ) : (
              <Typography onClick={handleSignInClick}>
                I already have an account, Login
              </Typography>
            )}
          </Box>
        </Stack>
      </form>
    </DialogContent>
  </Dialog>
</div>
  );
};

export default AuthPage;
