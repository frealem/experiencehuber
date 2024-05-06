import { Avatar, Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import TitleTwoLine from '../../../components/titleTwoLine'
import image from '../../../assets/images/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg'
const CommentBox = () => {
    const theme=useTheme();
  return (
    <><Box display="flex" alignItems="flex-end" marginBottom={2}>
    <Avatar
      sx={{ width: 40, height: 40, marginRight: -3 }}
      alt="User Avatar"
      src={image}
    />
    <Box
      sx={{
        backgroundColor: theme.palette.secondary[100],
        borderRadius: 4,
        padding: 2,
        maxWidth: '80%',
      }}
    >
      <TitleTwoLine variant="body1" gutterBottom color={theme.palette.secondary[900]}>
        First line of the comment,First line of the comment
      </TitleTwoLine>
      
      <Box display="flex" alignItems="center">
        <Typography variant="caption" color={theme.palette.secondary[600]} marginRight={1} marginLeft={3}>
          10:00 AM
        </Typography>
        <Typography variant="caption" color={theme.palette.secondary[600]} marginRight={1}>
          100 Likes
        </Typography>
        <Typography variant="caption" color={theme.palette.secondary[600]}>
          5 Reply
        </Typography>
      </Box>
    </Box>
  </Box></>
  )
}

export default CommentBox