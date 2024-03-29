import { Button, useTheme } from '@mui/material'
import React from 'react'

const MyButton=({children,props})=> {
    const theme=useTheme();
  return (
    <Button {...props}  
    sx={{borderRadius:15,backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.default}}>{children}</Button>
  )
}

export  default MyButton;