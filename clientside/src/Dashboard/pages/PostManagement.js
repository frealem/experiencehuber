import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import { posts } from '../../fakeData';
import PostDashboardComponent from '../component/posts';

const PostManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
    <Box mt={10}
      marginLeft={!isMobile ? "300px" : "10px"}
      marginRight={isMobile ? "10px" : null}>
      <Typography  color={theme.palette.secondary.main} fontSize={18} mb={2}>Post Management</Typography>
      
        {posts.map(
        () => (<Box>
          <PostDashboardComponent/> 
          </Box>
        )
      )}
     </Box>
    </>
  )
}

export default PostManagement