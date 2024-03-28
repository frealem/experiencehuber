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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PhoneInputField from "../components/phoneInput";
import { useAuth } from "../hooks/useAuth";
import { useForm } from 'react-hook-form';
//client side validation

const registerSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  phone: yup.string().required("required"),
  password: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  userName: yup.string().required("required"),
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
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

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

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');
  const auth = useAuth();
  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user,navigate,returnUrl]); //check navigate and url

  const submitLogin = async ({ email, password }) => {
    await login(email, password);
navigate('/');
  };

  //regsteration

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user,navigate,returnUrl]);
 
  const submitRegister = async data => {
    await auth.register(data);
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
          <form onSubmit={handleSubmit(submitLogin)} noValidate>
          <Stack spacing={2} margin={2}>
          <input
            type="email"
            placeholder="email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: 'Email Is Not Valid',
              },
            })}
            error={errors.email}
          />

          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: true,
            })}
            error={errors.password}
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
            </form>
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
          <form onSubmit={handleSubmit(submitRegister)} noValidate>
          <input
            type="text"
            placeholder="Name"
            {...register('name', {
              required: true,
              minLength: 6,
            })}
            error={errors.name}
          />

            <input
            type="text"
            placeholder="phone"
            {...register('phone', {
              required: true,
              minLength: 8,
            })}
            error={errors.phone}
          />
            <input
            type="text"
            placeholder="userName"
            {...register('userName', {
              required: true,
              minLength: 6,
            })}
            error={errors.userName}
           
          />
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: 'Email Is Not Valid',
              },
            })}
            error={errors.email}
          />

          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: true,
              minLength: 5,
            })}
            error={errors.password}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            {...register('password', {
              required: true,
              validate: value =>
                value !== getValues('password')
                  ? 'Passwords Do No Match'
                  : true,
            })}
            error={errors.confirmPassword}
          />
          

          <button type="submit" >Sign Up</button>

          <div>
            I have already an account? &nbsp;
            <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Login
            </Link>
          </div>
        </form>
                    {/*
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="phone"
                      component={PhoneInputField}
                      inputStyle={{ width: "100%", outerHeight: "100%" }} // Set the width of the phone input field
                      containerStyle={{ width: "100%", outerHeight: "100%" }}
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
                    /> */}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AuthPage;
