import { Box, Typography } from "@mui/material";
import React from "react";
import UserImage from "../../../components/userImage";
import CommentsBox from "./commentsBox";
import TitleTwoLine from "../../../components/titleTwoLine";

const LeftEachPost = () => {
  return (
    <>
      <Box>
        <Box ml={10}>
          <UserImage size={100} />
        
        <Typography fontWeight={600}>Hassen Jemal </Typography></Box>
        <TitleTwoLine>i am enterprenuer.traveling some place make me happy
        some place make me happy
        some place make me happy</TitleTwoLine>
        <CommentsBox />
      </Box>
    </>
  );
};

export default LeftEachPost;
