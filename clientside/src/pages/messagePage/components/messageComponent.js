import React, { useRef, useState } from "react";
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
  position: "fixed",
  bottom: theme.spacing(6),
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  zIndex: 1,
  maxWidth:"90%"
}));

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const theme=useTheme();

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
  };

  const handleRemoveEmoji = (emoji) => {
    const updatedEmojis = selectedEmojis.filter((e) => e !== emoji);
    setSelectedEmojis(updatedEmojis);
  };
  const [isEmojiBoxDragging, setIsEmojiBoxDragging] = useState(false);
  const [emojiBoxPosition, setEmojiBoxPosition] = useState({ x: 10, y: 10 });
  const emojiBoxRef = useRef(null);
  const initialPosition = useRef({ x: 0, y: 0 });

  const handleEmojiBoxMouseDown = (event) => {
    event.preventDefault();
    setIsEmojiBoxDragging(true);
    const { clientX, clientY } = event;
    initialPosition.current = { x: clientX, y: clientY };
  };

  const handleEmojiBoxMouseMove = (event) => {
    if (!isEmojiBoxDragging) {
      return;
    }
    const { clientX, clientY } = event;
    const dx = clientX - initialPosition.current.x;
    const dy = clientY - initialPosition.current.y;
    setEmojiBoxPosition((prevPosition) => ({
      x: prevPosition.x + dx,
      y: prevPosition.y + dy,
    }));
    initialPosition.current = { x: clientX, y: clientY };
  };

  const handleEmojiBoxMouseUp = () => {
    setIsEmojiBoxDragging(false);
  };

  return (
    <Container>
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
                      <img
                        src={emoji.imageUrl}
                        alt={emoji.name}
                        style={{ width: "1em", height: "1em" }}
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
        <Box> {openEmojiBox && (
          <Box
          ref={emojiBoxRef}
  onMouseDown={handleEmojiBoxMouseDown}
  onMouseMove={handleEmojiBoxMouseMove}
  onMouseUp={handleEmojiBoxMouseUp}
  isDragging={isEmojiBoxDragging}
            sx={{
              top: emojiBoxPosition.y,
  left: emojiBoxPosition.x,
              display: "flex",
              alignItems: "flex-end",
              justifyContent:"flex-end",
              marginLeft: "auto",
              marginRight: 5,
              position: "relative",
              zIndex: 2,
            }}
          >
            {selectedEmojis.map((emoji, index) => (
              <Emoji
                key={index}
                emoji={emoji}
                size={30}
                onClick={() => handleRemoveEmoji(emoji)}
              />
            ))}
            <Box
              sx={{
                position: "absolute",
                top: "-100%",
                right: 0,
                zIndex: 1,
              }}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </Box>
          </Box>
        )}</Box>
      </MessageList><div>
      <InputContainer component={Box} p={1} >
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
          value={messageText}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Type a message..."
          fullWidth
        />
        <IconButton onClick={handleSendMessage}>
          <Send />
        </IconButton>
      </InputContainer></div>
    </Container>
  );
};

export default ChatRoom;