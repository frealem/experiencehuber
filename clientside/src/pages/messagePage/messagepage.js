import React from 'react';
import { styled } from '@mui/system';
import { Box, IconButton } from '@mui/material';
import { MenuRounded, PeopleAlt, PeopleAltOutlined, QuestionAnswerOutlined } from '@mui/icons-material';
import UserList from './components/userList';
import ChatRoom from './components/messageComponent';
import { useState, useEffect, useRef } from 'react';
import {socket} from './socket';
import { getCurrentUserApi } from '../../components/States/userIntegration/userApi';
import { getChatFreinds, getMessages } from '../../components/States/messageIntegration/chatApi';

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
  
  //use states
  const [currentUser, setCurrentUser] = useState(null);
  const [onlineFreindsId, setOnlineFreindsId] = useState([]);
  const [selectedUser, setSelectUser] = useState(null);
  const [userFreinds, setUserFreinds] = useState([]);
  const [messages, setMessages] = useState([]);
  
  
  //functions 
  const handleUserSelect = (user) => {
    setSelectUser(user);
    fetchMessages(user._id);
  }
  const fetchMessages = async(userId)=>{
        const m = await getMessages(userId);
        setMessages(m);
  };


  // use effects
  useEffect(()=>{
    const initializeChat = async ()=>{
      const user = await getCurrentUserApi();
      // socket.current = io('http://localhost:8800');
      // socket.current.emit("addNewUser", user);
      // socket.current.on("getActiveUsers", (freinds) => {
      //   setOnlineFreindsId(freinds);
      // });
      const us = await getChatFreinds();
      setUserFreinds(us);
      setSelectUser(us[0]);
      socket.emit("addNewUser", user._id);
      socket.on("getActiveUsers", (freinds) => {
        console.log(freinds)
         setOnlineFreindsId(freinds);
       });
      setCurrentUser(user);
    }
    initializeChat();
    socket.on("recieveMessage", (data) => {
      console.log(selectedUser)
      setMessages((prev) => {
        return [data, ...prev]});
    })
  },[]);

  // useEffect(() => {
  //   const fetchMessages = async()=>{
  //     if(!selectedUser) return;
  //     const m = await getMessages(selectedUser._id);
  //     setMessages(m);
  //   };
  //   fetchMessages();    
  // },[selectedUser])

  // useEffect(() => {
  //   socket.on("recieveMessage", (message) => {
  //     if(message)
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   })
  // },[]);


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
          <UserList currentUser = {currentUser} onlineFreinds = {onlineFreindsId} handleUserSelect = {handleUserSelect} users= {userFreinds}/>
          </Box>
        </Box>
      </ScrollableBox>
      <WideBox><ChatRoom currentUser = {currentUser} onlineFreinds = {onlineFreindsId} socket = {socket} selectedUser={selectedUser} messages={messages} setMessages={setMessages}/></WideBox>
    </Container>
  );
};

export default MessagePage;