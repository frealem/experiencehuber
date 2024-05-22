import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import { posts } from '../../fakeData';
import UserListComponent from '../component/usersList';

function UserManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
    <Box mt={10}
      marginLeft={!isMobile ? "300px" : "10px"}
      marginRight={isMobile ? "10px" : null}>
      <Typography  color={theme.palette.secondary.main} fontSize={18} mb={2}>User Management</Typography>
        {posts.map(
        () => (<Box>
          <UserListComponent/> 
          </Box>
        )
      )}
     </Box>
    </>
  )
}

export default UserManagement