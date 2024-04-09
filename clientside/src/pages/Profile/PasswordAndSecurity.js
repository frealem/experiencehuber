import React from 'react'
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const PasswordSecurity = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
   
  return (
    <Box mt={10} marginLeft={!isMobile ? "400px":"10px"} marginRight={isMobile ? "10px":null} align="center">
    <Box>
     <Typography
              variant="h4"
              align="center"
              fontWeight="400"
              color={theme.palette.secondary.main}
              marginBottom={3}
            >
              Change Password 
            </Typography>
            </Box>
            <Box>
                the form
            </Box>
            <Box>
            <Typography
              variant="h4"
              align="center"
              fontWeight="400"
              color={theme.palette.secondary.main}
              marginBottom={3}
            >
              Security and Privacy 
            </Typography>
            </Box>
            <Box>
                the password and security part
            </Box>
    </Box>
  )
}

export default PasswordSecurity