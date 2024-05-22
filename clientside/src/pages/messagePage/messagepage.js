import React from 'react';
import { styled } from '@mui/system';
import { Box, IconButton } from '@mui/material';
import { MenuRounded, PeopleAlt, PeopleAltOutlined, QuestionAnswerOutlined } from '@mui/icons-material';
import UserList from './components/userList';
import ChatRoom from './components/messageComponent';


const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const SmallBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#f1f1f1',
  width: '5%',
  paddingLeft:"10px",
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '150px',
  },
}));

const ScrollableBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#f9f9f9',
  width: '35%',
  overflowY: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    flex: '1 1 auto',
  },
}));

const WideBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#e1e1e1',
  width: '60%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '200px',
  },
}));

const MessagePage = () => {
  return (
    <Container>
      <SmallBox sx={{
        paddingTop:"20px",
      }}>
        <IconButton>
            <MenuRounded/>
        </IconButton>
        <IconButton>
            <QuestionAnswerOutlined/>
        </IconButton>
        <IconButton>
            <PeopleAltOutlined/>
        </IconButton>
        <IconButton>
            <PeopleAltOutlined/>
        </IconButton>
      </SmallBox>
      <ScrollableBox>
        <Box sx={{ height: '100%', overflowY: 'scroll' }}>
          {/* Scrollable content */}
          <Box> 
          <UserList/>
          </Box>
        </Box>
      </ScrollableBox>
      <WideBox><ChatRoom/></WideBox>
    </Container>
  );
};

export default MessagePage;