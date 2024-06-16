// Followers.js
import React from 'react';
import { Grid, Paper, Avatar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import RatingComponent from '../../../components/Rating';

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

const RelatedPosts = () => {
  return (
    <Grid container spacing={2}>
      {followers.map((follower) => (
        <Grid item xs={12} key={follower.id}>
          <UserBox>
            <Avatar src={follower.avatar} />
            <UserInfo>
              <Typography variant="h6">{follower.name}</Typography>
              <Typography variant="body2">{follower.description}</Typography>
              <RatingComponent/>
            </UserInfo>
    
          </UserBox>
        </Grid>
      ))}
    </Grid>
  );
};

export default RelatedPosts;