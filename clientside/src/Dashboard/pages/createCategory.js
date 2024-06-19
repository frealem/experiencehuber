import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCateogryApi } from "../../components/States/adminIntegration/categoryApi";

// Client-side validation schema
const registerSchema = yup.object().shape({
  fullName: yup.string(),
  password: yup.string(),
  email: yup.string(),
  phone: yup.string(),
  userName: yup.string(),
});



const initialValuesSignup = {
  email: "",
  phone: "",
  userName: "",
  fullName: "",
  password: "",
};

const CreateCategory = ({ open, onClose, setIsOpen, setCategories}) => {

const submitRegister = async (values) => {
  try {
    const res = await createCateogryApi(values)
    console.log(res)
    setCategories((prev)=> [...prev, res]);
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
    Guideline Create
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
          placeholder="category name"
          variant="outlined"
          {...formik.getFieldProps("name")}
          error={formik.touched.fullName && formik.errors.fullName}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />

        <TextField
          type="text"
          placeholder="description"
          variant="outlined"
          {...formik.getFieldProps("description")}
          error={formik.touched.userName && formik.errors.userName}
          helperText={formik.touched.userName && formik.errors.userName}
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
Create category
</Button>
  </Stack>
</form>
</DialogContent>
    </Dialog>
  </div>
);
};

export default CreateCategory
