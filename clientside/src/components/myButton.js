import { Button, useTheme } from '@mui/material';
import React from 'react';

const MyButton = ({ children, width, ...props }) => {
  const theme = useTheme();

  return (
    <Button
    {...props}
    sx={{
      borderRadius: 15,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.default,
      width: width ? width : 'auto',
      padding: 1,
      fontSize: 17,
      fontWeight: "400",
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
      '&:focus': {
        backgroundColor: theme.palette.secondary.dark,
      },
    }}
  >
    {children}
  </Button>
  );
};

export default MyButton;