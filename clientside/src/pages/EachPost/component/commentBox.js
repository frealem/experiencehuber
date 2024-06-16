import { Avatar, Box, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TitleTwoLine from '../../../components/titleTwoLine'
import image from '../../../assets/images/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg'
import { getOneUserApi } from '../../../components/States/userIntegration/userApi'
const CommentBox = ({comment, setComment}) => {
    const theme=useTheme();
    const [user, setUser] = useState(null);

    useEffect(()=>{
      const getUser = async()=>{
        setUser(await getOneUserApi(comment.commeterId));
      }
      getUser();
    },[])
  return (
    <><Box display="flex" alignItems="flex-end" marginBottom={2}>
      {user ? (
    <Avatar
      sx={{ width: 40, height: 40, marginRight: -3 }}
      alt="User Avatar"
      src={image}
    />): "loading ..."}
    <Box
      sx={{
        backgroundColor: theme.palette.secondary[100],
        borderRadius: 4,
        padding: 2,
        maxWidth: '80%',
      }}
    >
      <TitleTwoLine variant="body1" gutterBottom color={theme.palette.secondary[900]}>
        {comment.content}
      </TitleTwoLine>
      
      <Box display="flex" alignItems="center">
        <Typography variant="caption" color={theme.palette.secondary[600]} marginRight={1} marginLeft={3}>
          {comment.createdAt}
        </Typography>
      </Box>
    </Box>
  </Box></>
  )
}

export default CommentBox