import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";
import UserImage from "../../../components/userImage";
import CommentsBox from "./commentsBox";
import TitleTwoLine from "../../../components/titleTwoLine";
import RelatedPosts from "./relatedPost";
import {useNavigate} from "react-router-dom";


const LeftEachPost = ({postCreater, comments, setComments, post}) => {
  const navigate = useNavigate();
  const theme=useTheme();
  return (
    <>
      <Box>
        {postCreater? (
        <>
        <Box ml={10} onclick={()=>navigate("/othersprofile", {replace:true, state: postCreater})}>
        <UserImage size={100} image={postCreater?.profilePictuerURL}/>
        
        <Typography fontWeight={600}>{postCreater?.userName}</Typography>
        </Box>
        <TitleTwoLine>{postCreater?.bio}</TitleTwoLine>
        </>
        ):"loading..."}
        <CommentsBox comments={comments} setComments={setComments} post={post}/>
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
        <RelatedPosts post={post}/>
      </Box>
    </>
  );
};

export default LeftEachPost;
