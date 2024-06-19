import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TitleTwoLine from '../../components/titleTwoLine'
import image from '../../assets/images/chatapp.jpeg'
import { getOneUserApi } from '../../components/States/userIntegration/userApi'
import {format} from 'date-fns'
const PostDashboardComponent = ({post}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [postCreater, setPostCreater] = useState(null);

    useEffect(()=>{
      const getPostCreater = async() =>{
        setPostCreater(await getOneUserApi(post.posterId));
      }
      getPostCreater();
    },[])
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
      src={`http://localhost:5000/uploads/${post.imageURL[0]}`}
    />
    </Box>
    <Box display="block">
      <TitleTwoLine variant="body1" gutterBottom color={theme.palette.secondary[900]}>
         {post.title}
      </TitleTwoLine>
      
      <Box display="flex">
        <Box fontSize={10} color={theme.palette.secondary[600]} marginRight={1}>
        Id: {post._id}
        </Box>
        <Box fontSize={10} color={theme.palette.secondary[600]}>
         {postCreater? (`By:${postCreater.userName}`): "loading..."}
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
      src={`http://localhost:5000/uploads/${post.imageURL[0]}`}
    />
    </Box>
    <Box >
      <TitleTwoLine variant="body1" gutterBottom color={theme.palette.secondary[900]}>
        {post.title}
      </TitleTwoLine>
      
      <Box display="flex" justContent="space-around" gap={5}>
      <Box>
        <Typography variant="caption" color={theme.palette.secondary[600]} marginRight={1} marginLeft={3}>
          {format(post?.createdAt, 'MMM d yyy')}
        </Typography>
        <Typography variant="caption" color={theme.palette.secondary[600]} marginRight={1}>
         Id: {post._id}
        </Typography>
        <Typography variant="caption" color={theme.palette.secondary[600]}>
        {postCreater? (`By:${postCreater.userName}`): "loading..."}
        </Typography>
        </Box>
        <Typography color='red'>Delete</Typography>
      </Box>
      
    </Box>
    
    </Box>)}
    
    </Box>
  )
}

export default PostDashboardComponent