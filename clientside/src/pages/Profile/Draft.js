import React, {useState, useEffect}from 'react'
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PostWidget from '../widgets/postWidget';
import { createPostApi, getPostPreviewByCurrentUser, deletePostPreview} from '../../components/States/postIntegration/postApi';
import { draftedPosts } from './component/draft';
// import { posts } from "../.";
const DraftPost = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
      const getLikedPosts = async()=>{
        let a = await getPostPreviewByCurrentUser();
        console.log(a);
        setPosts(a)
      }
      getLikedPosts()
    },[])

    const handleDelete = async(postId)=> {
      try {
        const deleted = await deletePostPreview(postId);
        setPosts((prev)=>{
          const a = [...prev];
          return a.filter((item)=> item._id !== postId)
        })
      } catch (error) {
        
      }
    }
    const handlePost = async(postId)=>{
      try {
        const p = posts.find((item) => item._id === postId)
        const post = await createPostApi(p);
        const deleted = await deletePostPreview(postId);
        setPosts((prev)=>{
          const a = [...prev];
          return a.filter((item)=> item._id !== postId)
        })
      } catch (error) {
        
      }
    }

    useEffect(()=>{
      const change = () =>
      change()
    },[posts])
   
  return (
    <Box mt={10} marginLeft={!isMobile ? "400px":"10px"} marginRight={isMobile ? "10px":null} align="center">
     <Typography
              variant="h4"
              align="center"
              fontWeight="400"
              color={theme.palette.secondary.main}
              marginBottom={3}
            >
              My Draft List
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
        {posts?.map((post, index) => (
          <Grid
            key={post._id}
            item
            xs={12}
            sm={6}
            md={6}
          >
            <PostWidget heightPost="200px" post={post} type='1' onDelete={()=>
               handleDelete(post._id)} onPost={()=>handlePost(post._id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default DraftPost