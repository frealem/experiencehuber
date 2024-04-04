import { Box, Button, Divider, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import CommentBox from "./commentBox";

const comments = [
  {
    id: 1,
    content: "wow is it real i want to enjoy too",
    like: 6,
    time: "6m",
  },
  {
    id: 2,
    content: "That looks amazing! I wish I could be there.",
    like: 10,
    time: "12m",
  },
  {
    id: 3,
    content: "Such a beautiful place. I want to visit someday.",
    like: 3,
    time: "20m",
  },
  {
    id: 4,
    content: "This is unreal! I'm speechless. 😍",
    like: 16,
    time: "30m",
  },
  {
    id: 5,
    content: "I've always wanted to go there. It's on my bucket list!",
    like: 8,
    time: "45m",
  },
  {
    id: 6,
    content: "The scenery is breathtaking. Great shot!",
    like: 5,
    time: "1h",
  },
];

const CommentsBox = () => {
    const theme=useTheme();
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={5} mt={3}>
        <Typography
          variant="h3"
          style={{ margin: "0 10px" }}
          fontSize={24}
          fontWeight={600}
          color={theme.palette.secondary[100]}
        >
          Comments
        </Typography>
        <Divider style={{ flexGrow: 1 }} />
      </Box>
      <Box sx={{ height: '400px', overflowY: 'auto' ,scrollbarWidth: 'none', '-ms-overflow-style': 'none'}}>
        {comments.map((comment) => (
          <CommentBox key={comment.id} comment={comment} />
        ))}
      </Box>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
      <TextField
        style={{ marginRight: '10px' }}
        variant="outlined"
        borderColor='secondary'
        
      />
      <Button
        style={{ marginLeft: '10px' }}
        variant="contained"
        color='secondary'
      >
        Send
      </Button>
    </div>
    </Box>
  );
};

export default CommentsBox;
