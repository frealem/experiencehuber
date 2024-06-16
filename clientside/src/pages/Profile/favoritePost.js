import React, {useState, useEffect}from 'react'
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PostsWidget from '../widgets/postsWidget';
import { getLikedPosts, getLikedPostsApi } from '../../components/States/postIntegration/postApi';
// import { posts } from "../.";
const FavoritePost = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
      const getLikedPosts = async()=>{
        let a = await getLikedPostsApi()
        a = [...a]
        a.forEach(element => {
          const post = {
            ...element,
            isLiked: true
          }
          setPosts((prev)=> [...prev, post])
        });
       
      }
      getLikedPosts()
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
              My Favorite Post List
            </Typography>
    <PostsWidget posts={posts}/>
    </Box>
  )
}

export default FavoritePost