import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PostsWidget from '../../widgets/postsWidget';
import { getPostByCurrentUser } from '../../../components/States/postIntegration/postApi';
// import { posts } from "../.";
const MyPost = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const[posts, setPosts] = useState([]);

    useEffect(()=>{
      const getPosts = async()=>{
        setPosts(await getPostByCurrentUser())
      }
      getPosts();
    },[])
   
  return (
    <Box mt={10} marginLeft={!isMobile ? "400px":"10px"} marginRight={isMobile ? "10px":null} align="center">
     <Typography
              variant="h4"
              align="center"
              fontWeight="400"
              color={theme.palette.secondary.main}
              marginBottom={3}
            >
              My Posts
            </Typography>
    <PostsWidget posts={posts}/>
    </Box>
  )
}

export default MyPost