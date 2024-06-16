import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React ,{useState, useEffect}from 'react'
import { posts } from '../../fakeData';
import PostDashboardComponent from '../component/posts';
import { getAllPosts } from '../../components/States/postIntegration/postApi';

const PostManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const getPosts = async()=>{
       setPosts(await getAllPosts());
    }
    getPosts();
  },[])
  return (
    <>
    <Box mt={10}
      marginLeft={!isMobile ? "300px" : "10px"}
      marginRight={isMobile ? "10px" : null}>
      <Typography  color={theme.palette.secondary.main} fontSize={18} mb={2}>Post Management</Typography>
      { posts ? (
        posts.map(
        (post) => (<Box>
          <PostDashboardComponent post={post}/> 
          </Box>
        )
      )):"loading..."}
     </Box>
    </>
  )
}

export default PostManagement