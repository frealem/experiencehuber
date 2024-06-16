import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import TitleTwoLine from '../../components/titleTwoLine'
import image from '../../assets/images/chatapp.jpeg'
import { createChatFreindApi } from '../../components/States/messageIntegration/chatApi';
import {useNavigate} from 'react-router-dom';
const CategoryListComponent = ({user}) => {
    const theme=useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const handleDelete = () => {
      
    }
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
    <Typography>{user.userName}</Typography>
    <Typography>id: {user._id}</Typography>
    <Typography>Role: {user.role}</Typography>
    </Box>
    <Box display="flex" gap={3}>
    <Typography onClick={handleChat}>Chat</Typography>
    <Typography onClick={handleDelete}>delete</Typography>
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
    <Typography>{user.userName}</Typography>
    <Typography>id: {user._id}</Typography>
    <Typography>Role: {user.role}</Typography>
    </Box>
    <Box display="flex" gap={1}>
    <Typography>update</Typography>
    <Typography>delete</Typography>
    </Box>
    </Box>
    
    </Box>)}
    
    </Box>
  )
}

export default AdminListComponent