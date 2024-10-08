import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import * as yup from "yup";
import { useFormik } from "formik";
import { loginUser,registerUser} from "../components/States/authIntegration/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Client-side validation schema
const registerSchema = yup.object().shape({
  fullName: yup.string(),
  password: yup.string(),
  email: yup.string(),
  phone: yup.string(),
  userName: yup.string(),
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
  const { loading, type,error ,accessToken} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      
      navigate('/');
    }
  }, [accessToken,navigate]);
  useEffect(() => {
    if (error) {
      // Handle the error, e.g., display a notification
      console.error(error);
    }
  }, [error]);

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
  try {
    const { email, password } = values;
    const formData = { email, password };
    const { payload, error } = await dispatch(loginUser(formData));

    if (payload) {
      console.log("Successful login");
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const submitRegister = async (values) => {
  try {
    const { email, password, fullName, userName, phone } = values;
    const formData = { email, password, fullName, userName, phone };
    const registeredUser = await dispatch(registerUser(formData));
    console.log("Successful registration");

    const { payload } = await dispatch(loginUser(formData));
    console.log("Successful login");
  } catch (error) {
    console.log(error.message);
  }
};
  // Formik configuration
  const formik = useFormik({
    initialValues: signUp ? initialValuesSignup : initialValuesLogin,
    validationSchema: signUp ? registerSchema : loginSchema,
    onSubmit: (values) => {
     
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
          },
        }}
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
            {...formik.getFieldProps("fullName")}
            error={formik.touched.fullName && formik.errors.fullName}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          <TextField
            type="text"
            placeholder="userName"
            variant="outlined"
            {...formik.getFieldProps("userName")}
            error={formik.touched.userName && formik.errors.userName}
            helperText={formik.touched.userName && formik.errors.userName}
          />
           <TextField
            type="text"
            placeholder="phone"
            variant="outlined"
            {...formik.getFieldProps("phone")}
            error={formik.touched.phone && formik.errors.phone}
            helperText={formik.touched.phone && formik.errors.phone}
          />
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
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            type="password"
            placeholder="Confirm Password"
            {...formik.getFieldProps("confirmPassword")}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
  type="button"
  variant="contained"
  onClick={(e) => {
    e.preventDefault();
    signUp ? submitRegister(formik.values) : submitLogin(formik.values);
  }}
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
