
import React, { useEffect, useState } from 'react'
import sponsorImage from '../../assets/images/chatapp.jpeg'
import { adverts } from '../../fakeData'
import { Box, Divider, Typography } from '@mui/material'
import { getSpecialPostsApi } from '../../components/States/postIntegration/postApi'

const AdvertWidget = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const getSpecialPosts = async()=>{
      const postsData = await getSpecialPostsApi();
      setPosts(postsData)
    }
    getSpecialPosts()
  },[])
  return (
    <Box >
     <Box display="flex" alignItems="center" mb={5}>
        <Divider style={{ flexGrow: 1 }} />
        <Typography variant="body2" style={{ margin: '0 10px' }} fontWeight={600}>
          Sponsored Posts
        </Typography>
        <Divider style={{ flexGrow: 1 }} />
      </Box>
    {posts.slice(0,4).map(({ _id, title, link, imageURL }) => (
        <div key={_id} style={{ display: 'flex', gap: '10px', marginBottom: '10px' ,width:"90%" ,height:"100px" }}>
            <img alt="sponsor board" src={`http://localhost:5000/uploads/${imageURL[0]}`} style={{ width: '120px', height: '90px' ,borderRadius:8}}/>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography fontWeight={600}>{title}</Typography>
            <a href={link}>{link}</a>
            </div>
        </div>
    ))}
</Box>
  )
}

export default AdvertWidget