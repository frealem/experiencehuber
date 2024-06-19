import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Tabs, Tab, Paper, Avatar, Box, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import UserImage from '../../components/userImage';
import PostWidget from '../widgets/postWidget';
import { ChatOutlined } from '@mui/icons-material';
import { useLocation } from 'react-router-dom'
import { getPostByUserApi } from '../../components/States/postIntegration/postApi';

// Sample data


const ProfileContainer = styled(Container)({
  marginTop: '32px',
});

const ProfilePaper = styled(Paper)({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
});

const AvatarStyle = styled(Avatar)({
  width: '64px',
  height: '64px',
  marginRight: '16px',
});

const ProfileInfo = styled('div')({
  flex: 1,
});

const TabsStyle = styled(Tabs)({
  marginTop: '16px',
});

const PostImage = styled('img')({
  width: '100%',
  height: 'auto',
});

const OthersProfile = () => {
  const [currentTab, setCurrentTab] = useState(0);
  //const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const user = location.state;
  const [posts, setPosts] = useState([])
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(()=>{
    const getUsersPost = async()=>{
      const postData = await getPostByUserApi(user._id);
      setPosts(postData);
    }
    getUsersPost();
  },[])

  return (
    <ProfileContainer maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfilePaper>
            <Box mr="10px">
            <UserImage size={70} image={user?.pro}/>
            </Box>
            <ProfileInfo>
            <Typography variant="h4" fontWeight={600} mb={1} color={theme.palette.secondary.main}>{user.userName}</Typography>
              <Typography variant="h5" >{user?.fullName}</Typography>

              <Typography variant="body2" mb={1}>{user?.bio}</Typography>
              {/* <Typography variant="body2" mb={1} fontWeight={600} color={theme.palette.secondary.main}>
                Followers: {profileData.followers} | Following: {profileData.following}
              </Typography> */}
              <IconButton><ChatOutlined/></IconButton>
            </ProfileInfo>
          </ProfilePaper>
        </Grid>
        <Grid item xs={12}>
          <TabsStyle
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            color='secondary'
          >
            <Tab label="Posts" />
            <Tab label="Followers" />
            <Tab label="Following"/>
          </TabsStyle>
        </Grid>
        {currentTab === 0 && (
          <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{
            width: '100%',
            maxWidth: '1000px',
          }}
        >
      
          {posts.map((post, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
            >
             <PostWidget heightPost="200px" post={post}/>
            </Grid>
          ))}
        </Grid>
        )}
        
      </Grid>
    </ProfileContainer>
  );
};

export default OthersProfile
