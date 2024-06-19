import React, { useEffect, useRef, useState, FlatList } from "react";
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
import ReceiverMessage from "./RecieverMessage";
import SenderMessage from "./SenderMeassage";
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
  const theme = useTheme();
  const inputRef = useRef(null);
  const dispatch=useDispatch();
  const scroll = useRef(null);

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
        setMessages([...messages, sentMessage, ]);
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

  const handleAttachFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Process the selected file as needed
    console.log("Selected file:", file);
  };

  const handleEmojiClick = (emojiData) => {
    setSelectedEmojis([...selectedEmojis, emojiData.unified]);
    inputRef.current.focus();
    const currentValue = messageText;
    const updatedValue = currentValue + emojiData.emoji;
    setMessageText(updatedValue);
  };

  const handleRemoveEmoji = (emoji) => {
    const updatedEmojis = selectedEmojis.filter((e) => e !== emoji);
    setSelectedEmojis(updatedEmojis);
  };
  useEffect(()=>{
    scroll.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  },[messages]);
  
  // useEffect(()=>{
  //   scroll.current?.scrollIntoView({behavior: "smooth"});
  // },[messages])
  return (
    <Container>
    <ChatRoomNavbar selectedUser={selectedUser}/>
    <MessageList >
    {messages?
    (<ListItem
      style={{
        paddingLeft: '0px',
        display: 'flex',
        flexDirection: 'column',
        
      }}
    >
      {messages.map((message) => (
        <Box sx={{width:"100%", paddingX:"20px"}} key={message._id} ref={scroll}>
          {message.senderId === currentUser._id ? (
            <SenderMessage message={message}/>
          ) : (
            <ReceiverMessage message={message} />
          )}
        </Box>
      ))}
    </ListItem>): "Loading.."}
    </MessageList>
    
      {openEmojiBox && (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            position: "sticky",
            bottom: 0,
            padding: theme.spacing(1),
            zIndex: 1,
          }}
        >
          {selectedEmojis.map((emoji, index) => (
            <Emoji
              key={index}
              emoji={emoji}
              size={24}
              fallback={(emojiData) => <span>{emojiData.emoji}</span>}
              onDoubleClick={() => handleRemoveEmoji(emoji)}
            />
          ))}
          <Box sx={{ position: "relative", marginLeft: "auto" }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </Box>
        </Box>
      )}
      <InputContainer component={Box} p={1}>
        <IconButton onClick={handleAttachFile}>
          <AttachFile />
        </IconButton>
        <Input
          type="file"
          accept="image/*, .pdf, .doc, .docx"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
          fullWidth
        />
        <IconButton onClick={() => setOpenEmojiBox(!openEmojiBox)}>
          <EmojiEmotions />
        </IconButton>
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