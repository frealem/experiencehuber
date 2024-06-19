// Followers.js
import React, { useEffect, useState } from 'react';
import { Grid, Paper, Avatar, Typography, Button , TextField, Box} from '@mui/material';
import { styled } from '@mui/material/styles';
import RatingComponent from '../../../components/Rating';
import EditableRatingComponent from '../../../components/Rating2';
import { createRelatedPostApi, getRelatedPostApi } from '../../../components/States/postIntegration/realtedPostApi';
import { getOneUserApi } from '../../../components/States/userIntegration/userApi';
import RelatedPostBox from './relatedPostBox';

const UserBox = styled(Paper)({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  marginBottom: '16px',
});

const UserInfo = styled('div')({
  flex: 1,
  marginLeft: '16px',
});

const ActionButtons = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
const followers = [
    {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    isFollowing: false,
    description: 'Software Engineer at Acme Corp. Passionate about building scalable applications.',
    },
    {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    isFollowing: true,
    description: 'Creative Director at Design Agency. Loves exploring new design trends and techniques.',
    },
    {
    id: 3,
    name: 'Michael Johnson',
    username: 'michaeljohnson',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    isFollowing: false,
    description: 'Marketing Manager at Global Enterprises. Specializes in digital marketing strategies.',
    },
    ];

const RelatedPosts = ({post}) => {
  const [rate, setRate] = useState(0);
  const [relatePosts, setRelatedPost] = useState([])
  const [content ,setContent] = useState('');

  const handleRate = (e) =>{
    console.log(e.target.value)
    setRate(e.target.value)
  }
  const handleCreate = async()=>{
    if (!content) return;
    const related = {
      postId: post._id,
      description: content,
      rate: rate
    }
    const created = await createRelatedPostApi(related)
    console.log(created)
    setRelatedPost((prev)=>
      [created, ...prev]
    )
    setContent('')
  }

  useEffect(()=>{
    const getRelatePosts = async()=>{
      const relatedPostData = await getRelatedPostApi(post._id);
      console.log('hello')
      console.log(relatedPostData)
      setRelatedPost(relatedPostData?relatedPostData:[])
    }
    getRelatePosts();
  },[])

  useEffect(()=>{
    const change = ()=>
    change()
  },[relatePosts])
  return (
    <>
    <Box sx={{ height: '400px', overflowY: 'auto' ,scrollbarWidth: 'none', '-ms-overflow-style': 'none'}}>
    <Grid container spacing={2}>
      {relatePosts?( relatePosts.map((relatedPost) =>(
         <RelatedPostBox relatedPost={relatedPost} />
      ))):<></>}
    </Grid>
    </Box>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
    <TextField
      style={{ marginRight: '10px' }}
      variant="outlined"
      borderColor='secondary'
      value={content}
      onChange={(e)=>setContent(e.target.value)}
    />
    <Button
      style={{ marginLeft: '10px' }}
      variant="contained"
      color='secondary'
      onClick={handleCreate}
    >
      Send
    </Button>
  </div>
  <EditableRatingComponent onChange={(e)=>handleRate(e)} value={rate}/>
  </>
  );
};

export default RelatedPosts;