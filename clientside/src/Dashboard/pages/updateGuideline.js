import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import * as yup from "yup";
import { useFormik } from "formik";
import {  updateCateogryApi } from "../../components/States/adminIntegration/categoryApi";
import { updateCommunityGuidlineApi } from "../../components/States/adminIntegration/guidlineApi";

// Client-side validation schema
const registerSchema = yup.object().shape({
  fullName: yup.string(),
  password: yup.string(),
  email: yup.string(),
  phone: yup.string(),
  userName: yup.string(),
});





const UpdateGuideline = ({ guideline, open, onClose, setIsOpen, setGuidelines }) => {
    const initialValues = {
      name: guideline?.name || '',
      description: guideline?.description || '',
      reportCase: guideline?.reportCase || '',
    };
  
    const submitRegister = async (values) => {
      try {
        const res = await updateCommunityGuidlineApi(guideline._id, values);
        setGuidelines((prev) => prev.map((item) => (item._id === guideline._id ? res : item)));
        setIsOpen(false);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    // Formik configuration
    const formik = useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: (values) => {
        submitRegister(values);
      },
    });
  
    return (
      <div style={{ textAlign: "center" }}>
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
              zIndex: 9999,
            },
          }}
          BackdropProps={{
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 9998,
            },
          }}
        >
          <DialogTitle>
            Guideline Update
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
                <TextField
                  type="text"
                  placeholder="Guideline name"
                  defaultValue={formik.values.name}
                  variant="outlined"
                  {...formik.getFieldProps('name')}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
  
                <TextField
                  type="text"
                  placeholder="Description"
                  defaultValue={formik.values.description}
                  variant="outlined"
                  {...formik.getFieldProps('description')}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
  
                <TextField
                  type="text"
                  placeholder="Report case"
                  defaultValue={formik.values.reportCase}
                  variant="outlined"
                  {...formik.getFieldProps('reportCase')}
                  error={formik.touched.reportCase && Boolean(formik.errors.reportCase)}
                  helperText={formik.touched.reportCase && formik.errors.reportCase}
                />
  
                <Button type="submit" variant="contained">
                  Update Guideline
                </Button>
              </Stack>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default UpdateGuideline;