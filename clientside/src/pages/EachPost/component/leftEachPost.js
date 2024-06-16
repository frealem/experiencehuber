import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";
import UserImage from "../../../components/userImage";
import CommentsBox from "./commentsBox";
import TitleTwoLine from "../../../components/titleTwoLine";
import RelatedPosts from "./relatedPost";


const LeftEachPost = ({postCreater, comments, setComments}) => {
  const theme=useTheme();
  return (
    <>
      <Box>
        {postCreater? (
        <>
        <Box ml={10}>
        <UserImage size={100} image={postCreater.profilePictuerURL}/>
        
        <Typography fontWeight={600}>{postCreater.userName}</Typography></Box>
        <TitleTwoLine>{postCreater.bio}</TitleTwoLine>
        </>
        ):"loading..."}
        <CommentsBox comments={comments} setComments={setComments}/>
      </Box>
      <Box display="flex" alignItems="center" mb={5} mt={3}>
        <Typography
          variant="h3"
          style={{ margin: "0 10px" }}
          fontSize={24}
          fontWeight={600}
          color={theme.palette.secondary[100]}
        >
          Related Posts
        </Typography>
        <Divider style={{ flexGrow: 1 }} />
      </Box>
      <Box>
        <RelatedPosts/>
      </Box>
    </>
  );
};

export default LeftEachPost;
