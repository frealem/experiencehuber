import { Box, Typography, useMediaQuery, useTheme, TextField, IconButton } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react'
import { getSpecialPostsApi, searchPosts } from '../../components/States/postIntegration/postApi';
import { Search } from '@mui/icons-material';
import SpecailDashboardComponent from '../component/SpecialPostComponent';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from 'react-router-dom';

const SpecailPostManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const getAllSpecialPostsData = async() => {
    setPosts(await getSpecialPostsApi());
  };

  useEffect(() => {
    getAllSpecialPostsData();
  }, [posts]);

  const debouncedSearchPosts = useCallback(
    debounce(async (query) => {
      if (query) {
        const page = 1;
        const pageSize = 20;
        const postsData = await searchPosts(query, page, pageSize);
        setPosts(postsData.results);
      } else {
        getAllSpecialPostsData();
      }
    }, 500),
    []
  );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    debouncedSearchPosts(e.target.value);
  };
  const handleCreateSpecialPost = () =>{
    navigate('/createpost', {replace:true, state: true})
  }

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
        <IconButton 
      onClick={handleCreateSpecialPost}
      sx={{
        color:theme.palette.secondary[900],
        backgroundColor:theme.palette.secondary[100],
        height:"40px",
        width:"40px",
      }}><AddIcon/>
      </IconButton>
        {posts ? posts.map(
          (post) => (
            <Box key={post.id}>
              <SpecailDashboardComponent post={post} setPosts={setPosts}/>
            </Box>
          )
        ) : ('loading...')}
      </Box>
    </>
  );
};

export default SpecailPostManagement;

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}