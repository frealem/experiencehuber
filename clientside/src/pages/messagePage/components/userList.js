import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Avatar, InputBase, List, ListItem, ListItemAvatar, ListItemText, Typography, useTheme } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { userChats } from '../../../components/States/messageIntegration/chatSlice';

const usersData = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://example.com/avatar1.png',
      messageCount: 3,
      onlineStatus: true,
      lastSeen: '5 minutes ago',
      lastMessage: 'Hello there!',
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar2.png',
      messageCount: 0,
      onlineStatus: false,
      lastSeen: '2 hours ago',
      lastMessage: 'How are you?',
    },
    {
      id: 10,
      name: 'John Doe',
      avatar: 'https://example.com/avatar1.png',
      messageCount: 3,
      onlineStatus: true,
      lastSeen: '5 minutes ago',
      lastMessage: 'Hello there!',
    },
    {
      id: 20,
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar2.png',
      messageCount: 0,
      onlineStatus: false,
      lastSeen: '2 hours ago',
      lastMessage: 'How are you?',
    },
    {
      id: 100,
      name: 'John Doe',
      avatar: 'https://example.com/avatar1.png',
      messageCount: 3,
      onlineStatus: true,
      lastSeen: '5 minutes ago',
      lastMessage: 'Hello there!',
    },
    {
      id: 200,
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar2.png',
      messageCount: 0,
      onlineStatus: false,
      lastSeen: '2 hours ago',
      lastMessage: 'How are you?',
    },
    {
      id: 1000,
      name: 'John Doe',
      avatar: 'https://example.com/avatar1.png',
      messageCount: 3,
      onlineStatus: true,
      lastSeen: '5 minutes ago',
      lastMessage: 'Hello there!',
    },
    {
      id: 2000,
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar2.png',
      messageCount: 0,
      onlineStatus: false,
      lastSeen: '2 hours ago',
      lastMessage: 'How are you?',
    },
    {
      id: 11,
      name: 'John Doe',
      avatar: 'https://example.com/avatar1.png',
      messageCount: 3,
      onlineStatus: true,
      lastSeen: '5 minutes ago',
      lastMessage: 'Hello there!',
    },
    {
      id: 21,
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar2.png',
      messageCount: 0,
      onlineStatus: false,
      lastSeen: '2 hours ago',
      lastMessage: 'How are you?',
    },
    {
      id: 12,
      name: 'John Doe',
      avatar: 'https://example.com/avatar1.png',
      messageCount: 3,
      onlineStatus: true,
      lastSeen: '5 minutes ago',
      lastMessage: 'Hello there!',
    },
    {
      id: 22,
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar2.png',
      messageCount: 0,
      onlineStatus: false,
      lastSeen: '2 hours ago',
      lastMessage: 'How are you?',
    },
    // Add more user data as needed
  ];

const Container = styled('div')(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(2),
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
    backgroundColor: '#f2f2f2',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
      color: '#808080',
    },
    position: 'sticky',
    top: 0,
    zIndex: 1,
  }));
  
const UserList = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch=useDispatch()
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //chatapis========


const user=useSelector(state=>state.user.user)
const chats=useSelector(state=>state.chat.chats)

useEffect(()=>{
  // dispatch(userChats(user._id));
  console.log(dispatch(userChats(user._id)));
  
},[user,dispatch])

useEffect(()=>{
  
})


//useEffect to get another users Id
const users=useSelector(state=>state.user.users)

useEffect(()=>{

// const anotherUserId=data.members.find((id)=>id!==user._id);

// console.log(anotherUserId)
// dispatch(getAllUser());


},[])
  return (
    <Container>
      <SearchInput
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search users"
        startAdornment={<Search/>}
      />
      <List>
        {filteredUsers.map((user) => (
          <ListItem key={user.id} button sx={{ backgroundColor: theme.palette.background.default }}>
            <ListItemAvatar>
              <Avatar src={user.avatar} alt={user.name} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1">
                  {user.name}
                  {user.onlineStatus && (
                    <span style={{ color: 'green', marginLeft: 4 }}>
                      <CircleIcon fontSize="0.2px" />
                    </span>
                  )}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="textSecondary">
                  {user.messageCount > 0 && (
                    <span style={{ padding: 2, margin: 2, borderRadius: '100%', width: 2, height: 2, backgroundColor: 'purple', color: 'white' }}>
                      {user.messageCount}
                    </span>
                  )}
                  {user.lastMessage}
                </Typography>
              }
            />
            <ListItemText
              primary={
                <Typography variant="body2" color="textSecondary" align="right">
                  {user.lastSeen}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserList;