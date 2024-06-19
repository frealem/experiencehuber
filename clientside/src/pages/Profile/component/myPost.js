import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PostWidget from '../../widgets/postWidget';
import { getPostByCurrentUser, deletePostApi } from '../../../components/States/postIntegration/postApi';

const MyPost = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const[posts, setPosts] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setPosts(await getPostByCurrentUser());
      setShouldRefresh(false);
    };
    getPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const deleted = await deletePostApi(postId);
      setPosts((prev)=>{
        const a = [...prev];
        return a.filter((item) => item._id !== postId);
      })
      setShouldRefresh(true);
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

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
        My Posts
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
            <PostWidget heightPost="200px" post={post} type='0' onDelete={()=>
               handleDelete(post._id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyPost;