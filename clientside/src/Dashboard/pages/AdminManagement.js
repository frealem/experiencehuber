import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import { posts } from '../../fakeData';
import AdminListComponent from '../component/AdminListComponent';
import AddIcon from '@mui/icons-material/Add';
function AdminManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
    <Box mt={10}
      marginLeft={!isMobile ? "300px" : "10px"}
      marginRight={isMobile ? "10px" : null}><Box display="flex" justifyContent="space-between" mb={5}>
      <Typography  color={theme.palette.secondary.main} fontSize={18} mb={2}>Admin Management</Typography>
      <IconButton sx={{
        color:theme.palette.secondary[900],
        backgroundColor:theme.palette.secondary[100],
        height:"40px",
        width:"40px",
      }}><AddIcon/>
      </IconButton></Box>
        {posts.map(
        () => (<Box>
          <AdminListComponent/> 
          </Box>
        )
      )}
     </Box>
    </>
  )
}

export default AdminManagement