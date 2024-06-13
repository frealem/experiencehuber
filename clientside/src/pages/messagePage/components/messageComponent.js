import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  IconButton,
  Box,
  Paper,
  Input,
  useTheme,
} from "@mui/material";
import { Send, AttachFile, EmojiEmotions } from "@mui/icons-material";
import styled from "@mui/material/styles/styled";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import ChatRoomNavbar from "./chatNav";
import{useDispatch, useSelector} from  'react-redux'
import { getMessages, sendMessage, userChatsApi } from "../../../components/States/messageIntegration/chatApi";
import { userChats } from "../../../components/States/messageIntegration/chatSlice";
import {io} from "socket.io-client";
import {format} from "timeago.js"

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MessageList = styled(List)`
  flex-grow: 1;
  overflow: auto;
  padding: 16px;
`;

const InputContainer = styled(Paper)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  zIndex: 1,
}));



const ChatRoom = ({currentUser, selectedUser, onlineFreinds, socket, messages, setMessages}) => {
  //const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const[newMessage,setNewMessage]=useState("")
  const theme = useTheme();
  const inputRef = useRef(null);
  const dispatch=useDispatch()

  const handleSendMessage = async () => {
    if (messageText.trim() !== "" || selectedEmojis.length > 0) {
      const message = {
        content: messageText.trim(),
        senderId: currentUser._id,
        recieverId: selectedUser._id,
      };
  
      try {
        const sentMessage = await sendMessage(message);
        console.log(sentMessage);
        socket.emit("sendMessage", sentMessage);
        setMessages([...messages, sentMessage]);
        setMessageText("");
        setSelectedEmojis([]);
      } catch (error) {
        console.error("Error sending message:", error);
        // Add any additional error handling logic here
      }}
  };
  const handleInputChange = (event) => {
    setMessageText(event.target.value);
  };

  const fileInputRef = useRef(null);

  return (
    <Container>
    <ChatRoomNavbar selectedUser={selectedUser}/>
    {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${
            message.senderId === currentUser._id ? 'sender' : 'receiver'
          }`}
        >
          <div className="message-content">
            <span>{message.content}</span>
            <span>{format(message.createdAt)}</span>
            </div>
        </div>
      ))}
      
  
      <InputContainer component={Box} p={1}>
      <InputEmoji
          value={messageText}
          onChange={handleInputChange}/>
        <TextField
          placeholder="Type a message"
          value={messageText}
          onChange={handleInputChange}
          inputRef={inputRef}
          fullWidth
        />
        <IconButton onClick={handleSendMessage} color="secondary">
          <Send />
        </IconButton>
      </InputContainer>
    </Container>
  );
};

export default ChatRoom;