import { Box, Button, Divider, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommentBox from "./commentBox";
import { connect } from "formik";
import { createComment } from "../../../components/States/postIntegration/postApi";
import {format} from "date-fns";


const CommentsBox = ({comments, setComments, post}) => {
    const theme=useTheme();
    const [content, setContent] = useState('');
    const handleCreateCommet = async () => {
      if (!content) return;
      const c = [...comments];
      const comment = {
        postId: post?._id,
        content: content
      };
      const createdComment = await createComment(comment);
      console.log(createdComment);
      setComments((prev) => [createdComment, ...prev]);// Reset the content state to an empty string
      setContent('')
    };
    useEffect(()=>{
      const change = ()=>
      change()
    },[comments])
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
        {comments? (comments.map((comment) => (
          <CommentBox key={comment._id} comment={comment} />
        ))): ("loading...")}
      </Box>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
      <TextField
        style={{ marginRight: '10px' }}
        variant="outlined"
        borderColor='secondary'
        onChange={(e)=> setContent(e.target.value)}
      />
      <Button
        style={{ marginLeft: '10px' }}
        variant="contained"
        color='secondary'
        value={content}
        onClick={handleCreateCommet}
      >
        Send
      </Button>
    </div>
    </Box>
  );
};

export default CommentsBox;
