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
import { userChatsApi } from "../../../components/States/messageIntegration/chatApi";
import { userChats } from "../../../components/States/messageIntegration/chatSlice";

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

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const theme = useTheme();
  const inputRef = useRef(null);
  const dispatch=useDispatch()

  const handleSendMessage = () => {
    if (messageText.trim() !== "" || selectedEmojis.length > 0) {
      const message = {
        content: {
          text: messageText.trim(),
          emojis: selectedEmojis,
        },
        timestamp: new Date(),
        sender: "Me",
      };
      setMessages([...messages, message]);
      setMessageText("");
      setSelectedEmojis([]);
    }
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


  return (
    <Container>
    <ChatRoomNavbar/>
      <MessageList>
        {messages.map((message, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="User Avatar" src="/avatar.png" />
            </ListItemAvatar>
            <ListItemText
              primary={message.sender}
              secondary={
                <React.Fragment>
                  {message.content.emojis.length > 0 && (
                    <Box display="flex">
                      {message.content.emojis.map((emoji, index) => (
                        <Box key={index} sx={{ marginRight: 5 }}>
                          <Typography component="span" variant="body2">
                            <Emoji
                              emoji={emoji}
                              size={18}
                              fallback={(emojiData) => (
                                <span>{emojiData.emoji}</span>
                              )}
                            />
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                  {message.content.text}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
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
        <IconButton onClick={handleSendMessage} color="primary">
          <Send />
        </IconButton>
      </InputContainer>
    </Container>
  );
};

export default ChatRoom;