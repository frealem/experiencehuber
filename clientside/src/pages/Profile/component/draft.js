import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PostsWidget from '../../widgets/postsWidget';
import { getPostByCurrentUser, getPostPreviewByCurrentUser } from '../../../components/States/postIntegration/postApi';
import PostWidget from '../../widgets/postWidget';
// import { posts } from "../.";
const draftedPosts = ({posts, theme, isMobile}) => {
   
  return (
    <Box mt={10} marginLeft={!isMobile ? "400px":"10px"} marginRight={isMobile ? "10px":null} align="center">
      {posts?.map((post)=>
       <PostWidget post={post}/>
      )}
    </Box>
  )
}

export default draftedPosts