import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import * as yup from "yup";
import { useFormik } from "formik";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAdminApi } from "../../components/States/userIntegration/userApi";

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

const CreateAdmin= ({ open, onClose, setIsOpen, setUsers}) => {

  const navigate = useNavigate();
  //const [isOpen, setIsOpen] = useState(true);

  // useEffect(()=>{
  //   navigate('/adminmanagement')
  // },[isOpen])

const submitRegister = async (values) => {
  try {
    const res = await createAdminApi(values);
    setUsers((prev)=> [...prev, res]);
    setIsOpen(false);
  } catch (error) {
    // console.log(error.message);
  }
};
  // Formik configuration
  const formik = useFormik({
    initialValues:initialValuesSignup,
    validationSchema:registerSchema,
    onSubmit: (values) => {
     
    },
  });

  return (<div style={{ textAlign: "center" }}>
  <Dialog
  open={open}
  onClose={onClose}
  maxWidth="sm"
  PaperProps={{
    sx: {
      borderRadius: 10,
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      width: 'fit-content',
      padding: '1rem',
      zIndex: 9999, // Ensure the popup is on top of the rest of the content
    },
  }}
  BackdropProps={{
    sx: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent backdrop
      zIndex: 9998, // Backdrop should be behind the popup
    },
  }}
>
  <DialogTitle>
    Admin Create
    <IconButton
      color="error"
      variant="contained"
      onClick={onClose}
      style={{ float: 'right' }}
    >
      <CloseOutlinedIcon />
    </IconButton>
  </DialogTitle>
      <DialogContent>
<form onSubmit={formik.handleSubmit} noValidate>
  <Stack spacing={2} margin={2}>
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


    <Button
type="button"
variant="contained"
onClick={(e) => {
  e.preventDefault();
  submitRegister(formik.values) ;
}}
>
Create Admin
</Button>
  </Stack>
</form>
</DialogContent>
    </Dialog>
  </div>
);
};

export default CreateAdmin
