import React from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import EditProfile from './editProfile'

const ProfilePage = () => {
  const theme=useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box mt={10} marginLeft={!isMobile ? "400px":"10px"} marginRight={isMobile ? "10px":null}>
     <EditProfile/>
    </Box>
  )
}

export default ProfilePage