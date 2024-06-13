import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import UserImage from '../../../components/userImage';

const RelatedPost = () => {
    const theme=useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box mb={1}>
    {isMobile ? (<Box
      sx={{
        backgroundColor: theme.palette.secondary[100],
        borderRadius: 4,
        padding: 2,
        width: '90%',
      }}
    ><Box mr={1} gap={5} display="flex">
    <UserImage size={30}/>
    <Typography>This title of the related post</Typography>
    </Box>
    <Box display="flex" gap={3}>
    <Typography>like</Typography>
    <Typography>comment</Typography>
    <Typography>rate</Typography>
    </Box>
    
    </Box>):(<Box
      sx={{
        backgroundColor: theme.palette.secondary[100],
        borderRadius: 4,
        padding: 2,
        width: '900px',
        color:theme.palette.secondary[900],
      }}
    ><Box mr={1} display="flex" justifyContent="space-between">
    <Box display="flex" gap={2}>
    <UserImage size={30}/>
    <Typography>this the title of related post</Typography>
    </Box>
    <Box display="flex" gap={1}>
    <Typography>likes</Typography>
    <Typography>comments</Typography>
    <Typography>rates</Typography>
    </Box>
    </Box>
    
    </Box>)}
    
    </Box>
  )
}

export default RelatedPost;
