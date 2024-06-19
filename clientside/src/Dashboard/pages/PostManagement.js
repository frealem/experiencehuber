import { Box, Grid, Typography, useMediaQuery, useTheme, TextField } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react'
import { posts } from '../../fakeData';
import PostDashboardComponent from '../component/posts';
import { getAllPosts, searchPosts } from '../../components/States/postIntegration/postApi';
import { Search } from '@mui/icons-material';

const PostManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  const getAllPostsData = async() => {
    setPosts(await getAllPosts());
  };

  useEffect(() => {
    getAllPostsData();
  }, []);

  const debouncedSearchPosts = useCallback(
    debounce(async (query) => {
      if (query) {
        const page = 1;
        const pageSize = 20;
        const postsData = await searchPosts(query, page, pageSize);
        setPosts(postsData.results);
      } else {
        getAllPostsData();
      }
    }, 500),
    []
  );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    debouncedSearchPosts(e.target.value);
  };

  return (
    <>
      <Box mt={10}
        marginLeft={!isMobile ? "300px" : "10px"}
        marginRight={isMobile ? "10px" : null}>
        <TextField
          value={query}
          onChange={handleQueryChange}
          placeholder="Search posts..."
          InputProps={{
            startAdornment: <Search />,
          }}
        />
        <Typography color={theme.palette.secondary.main} fontSize={18} mb={2}>Post Management</Typography>
        {posts ? posts.map(
          (post) => (
            <Box key={post.id}>
              <PostDashboardComponent post={post} />
            </Box>
          )
        ) : ('loading...')}
      </Box>
    </>
  );
};

export default PostManagement;

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}