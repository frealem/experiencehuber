import React from 'react'
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PostsWidget from '../widgets/postsWidget';
// import { posts } from "../.";
const FavoritePost = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
   
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
    <PostsWidget/>
    </Box>
  )
}

export default FavoritePost