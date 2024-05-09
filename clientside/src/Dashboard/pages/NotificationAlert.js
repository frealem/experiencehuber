import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import { Notification } from '../../pages/Profile/Notification';


const NotificationAlert = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
    <Box mt={10}
      marginLeft={!isMobile ? "300px" : "10px"}
      marginRight={isMobile ? "10px" : null}>
      <Typography  color={theme.palette.secondary.main} fontSize={18} mb={2}>Notification and Alert</Typography>
     <Box width="1100px"> <Notification/></Box>
     </Box>
    </>
  )
}

export default NotificationAlert