import { Avatar, Box, Typography, useTheme, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TitleTwoLine from '../../../components/titleTwoLine'
import image from '../../../assets/images/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg'
import { getOneUserApi } from '../../../components/States/userIntegration/userApi'
import RatingComponent from '../../../components/Rating'

const RelatedPostBox = ({relatedPost, setComment}) => {
    const theme=useTheme();
    const [user, setUser] = useState(null);
    console.log('hello')

    useEffect(()=>{
      const getUser = async()=>{
        setUser(await getOneUserApi(relatedPost.posterId));
      }
      getUser();
    },[])
  return (
        <Grid item xs={12} key={relatedPost?._id}>
          <Box>
            <Avatar src={`http://localhost:5000/${user?.profilePictuerURL}`} />
            <Box>
              <Typography variant="h6">{user?.userName}</Typography>
              <Typography variant="body2">{relatedPost?.description}</Typography>
              <RatingComponent value={relatedPost?.rate}/>
            </Box>
    
          </Box>
        </Grid>
  )
}

export default RelatedPostBox

        