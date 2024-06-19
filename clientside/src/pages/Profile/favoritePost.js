import React, {useState, useEffect}from 'react'
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PostsWidget from '../widgets/postsWidget';
import { getLikedPosts, getLikedPostsApi } from '../../components/States/postIntegration/postApi';
import PostWidget from '../widgets/postWidget'
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
            <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{
            width: '100%',
            maxWidth: '1000px',
          }}
        >
      
          {posts.map((post, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
            >
             <PostWidget heightPost="200px" post={post}/>
            </Grid>
          ))}
        </Grid>
    </Box>
  )
}

export default FavoritePost