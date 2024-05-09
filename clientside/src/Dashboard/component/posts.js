import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import TitleTwoLine from '../../components/titleTwoLine'
import image from '../../assets/images/chatapp.jpeg'
const PostDashboardComponent = () => {

    const theme=useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box mb={1}>
    {isMobile ? (<Box
      sx={{
        display:"flex",
        backgroundColor: theme.palette.secondary[100],
        borderRadius: 4,
        padding: 2,
        maxWidth: '90%',
        height:"auto"
      }}
    ><Box mr={1}>
     <img
    width="50px"
    height="50px"
    borderRadius="10px"
      alt="User Avatar"
      src={image}
    />
    </Box>
    <Box display="block">
      <TitleTwoLine variant="body1" gutterBottom color={theme.palette.secondary[900]}>
       Inappropriate Contents
      </TitleTwoLine>
      
      <Box display="flex">
        <Box fontSize={10} color={theme.palette.secondary[600]} marginRight={1}>
        id12345678901234567890
        </Box>
        <Box fontSize={10} color={theme.palette.secondary[600]}>
        Gelila Daniel
        </Box>
      </Box>
      
      <Box fontSize={10} color={theme.palette.secondary[600]} marginRight={1} marginLeft={3}>
          10:00 AM 5/8/2024
        </Box>
    </Box>
    
    </Box>):(<Box
      sx={{
        display:"flex",
        backgroundColor: theme.palette.secondary[100],
        borderRadius: 4,
        padding: 2,
        width: '900px',
        height:"90px"
      }}
    ><Box mr={1} >
     <img
    width="50px"
    height="50px"
    style={{borderRadius:"10px"}}
      alt="User Avatar"
      src={image}
    />
    </Box>
    <Box >
      <TitleTwoLine variant="body1" gutterBottom color={theme.palette.secondary[900]}>
        the title of the post for the dashboard for admin,First line of the comment,the title of the post for the dashboard for admin
      </TitleTwoLine>
      
      <Box display="flex" justContent="space-around" gap={5}>
        <Typography variant="caption" color={theme.palette.secondary[600]} marginRight={1} marginLeft={3}>
          10:00 AM 5/8/2024
        </Typography>
        <Typography variant="caption" color={theme.palette.secondary[600]} marginRight={1}>
         Id:  id12345678901234567890
        </Typography>
        <Typography variant="caption" color={theme.palette.secondary[600]}>
          By: Gelila Daniel
        </Typography>
      </Box>
    </Box>
    
    </Box>)}
    
    </Box>
  )
}

export default PostDashboardComponent