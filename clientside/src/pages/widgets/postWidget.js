import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  // import Friend from "components/Friend";
  // import { useState } from "react";
  // import { useDispatch, useSelector } from "react-redux";
  // import { setPost } from "state";
  import postImage from "../../assets/images/pizza1.jpg"
  import StarIcon from '@mui/icons-material/Star';
import UserImage from "../../components/userImage";
import FlexBetween from "../../components/Flexbetween";
import WidgetWrapper from "../../components/widgetWrapper";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
  const PostWidget = () => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    return (
      <WidgetWrapper m="2rem 0">
        <Typography variant="h3" fontWeight={600}>This is the title of the review has to be one line</Typography>
        <Typography sx={{ mt: "1rem" }} variant="h6">
          this description is for the review and experience.this description is for the review and experience.
          this description is for the review and experience. this description is for the review and experience.</Typography>
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={postImage}
          />
           <Box display="flex" alignItems="center" gap="0.3rem">
      <UserImage size={40}/>
      <Typography variant="body1">Gelila Girma</Typography>
      <Typography variant="body2" color="textSecondary">
      Addis Ababa 6 hours ago
    </Typography>
    </Box>
         <Box>
              <IconButton>
                <StarIcon sx={{color:"yellow"}}/>
                <StarIcon sx={{color:"yellow"}}/>
                <StarIcon sx={{color:"yellow"}}/>
                <StarIcon sx={{color:"yellow"}}/>
                <StarIcon sx={{color:"yellow"}}/>
              </IconButton>
            </Box>

        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton>
                <FavoriteBorderOutlined />
              </IconButton>
              <Typography>26</Typography>
            </FlexBetween>
            
            <FlexBetween gap="0.3rem">
              <IconButton>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>45</Typography>
            </FlexBetween>
            <FlexBetween gap="0.3rem">
            <IconButton>
            <ShareOutlined />
          </IconButton>
            </FlexBetween>
            <FlexBetween gap="0.3rem">
            <IconButton>
            <BookmarkAddOutlinedIcon />
          </IconButton>
            </FlexBetween>
          </FlexBetween>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;