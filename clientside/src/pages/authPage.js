import React, { useRef, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PhoneInputField from "../components/phoneInput";
import { setLogin } from "../components/States/authSlice";
import { useLoginMutation } from "../components/States/authApiSlice";

//client side validation

const registerSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  phone: yup.string().required("required"),
  password: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  address: yup.string().required("required"),
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
  address: "",
  fullName: "",
  password: "",
};

const AuthPage = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const userRef = useRef();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();


  useEffect(()=>{
    useRef.current.focus()
  },[])

  useEffect(()=>{
// for errror

  },[]) //user,password
  //handle submit
  const handleSubmitLogin = () => {
    console.log("user logged in");
  };

  const handleSubmitSignup = () => {
    console.log("user signed up");
  };

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  const handleSignUpClick = () => {
    setSignUp(true);
  };

  const handleSignInClick = () => {
    setSignUp(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {!signUp ? (
        <Dialog
          open={open}
          onClose={closeDialog}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: 10, // Adjust the border radius as desired
              marginLeft: "auto", // Align to the left when viewed on desktop
              marginRight: "auto",
              maxWidth: 600, // Adjust the max width as needed
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
            <Formik
              initialValues={initialValuesLogin}
              onSubmit={handleSubmitLogin}
              validationSchema={loginSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <Form>
                  <Stack spacing={2} margin={2}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      label="Email"
                      name="email"
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <Button
                      type="submit"
                      backgroundColor={theme.palette.secondary.light}
                      variant="contained"
                    >
                      Sign In
                    </Button>
                    <a onClick={handleSignUpClick}>
                      I don't have an account, Sign Up
                    </a>
                  </Stack>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={closeDialog}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: 10, // Adjust the border radius as desired
              marginLeft: "auto", // Align to the left when viewed on desktop
              marginRight: "auto",
              maxWidth: 400, // Adjust the max width as needed
            },
          }}
        >
          <DialogTitle>
            Sign Up
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
            <Formik
              initialValues={initialValuesSignup}
              onSubmit={handleSubmitSignup}
              validationSchema={registerSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <Form>
                  <Stack spacing={2} margin={2}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="fullName"
                      placeholder="Enter your full name"
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="phone"
                      component={PhoneInputField}
                      inputStyle={{ width: "100%", outerHeight: "100%" }} // Set the width of the phone input field
                      containerStyle={{ width: "100%", outerHeight: "100%" }}
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="address"
                      placeholder="Enter your address"
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="email"
                      placeholder="Enter your email"
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="password"
                      type="password"
                      placeholder="Enter new password"
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="confirmPassword"
                      type="password"
                      placeholder="confirm your password"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          color="primary"
                          name="acceptAgreement"
                        />
                      }
                      label="Accept All Agreement And Submit"
                    />
                    <Button
                      type="submit"
                      backgroundColor={theme.palette.secondary.light}
                      variant="contained"
                    >
                      Sign Up
                    </Button>
                    <a onClick={handleSignInClick}>
                      I already have an account, Sign In
                    </a>
                  </Stack>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AuthPage;
