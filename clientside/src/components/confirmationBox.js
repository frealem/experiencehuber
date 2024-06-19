import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const ConfirmationDialog = ({ open, onConfirm, onCancel, title, message }) => {
  return (
    <Dialog open={open} onClose={onCancel}
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {message}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;