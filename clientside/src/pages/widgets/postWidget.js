import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  MoreHorizOutlined,
  MoreVertOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
// import Friend from "components/Friend";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";
import postImage from "../../assets/images/pizza1.jpg";
import StarIcon from "@mui/icons-material/Star";
import UserImage from "../../components/userImage";
import FlexBetween from "../../components/Flexbetween";
import WidgetWrapper from "../../components/widgetWrapper";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import RatingComponent from "../../components/Rating";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CommentModal from "../HomePage/component/feedComment";
import ShareButtons from "../HomePage/component/feedShare";
import ReportComponent from "../HomePage/component/report";
const PostWidget = ({widthPost,heightPost}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const navigate = useNavigate();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleCommentIconClick = () => {
    setIsCommentModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsCommentModalOpen(false);
  };
 const handleCommentSubmit=()=>{
  
 }

 const [shareOpen, setShareOpen] = useState(false);

 const handleShareClick = () => {
   setShareOpen(!shareOpen);
 };
//to handle the main right
const [anchorEl, setAnchorEl] = useState(null);
const isOpen = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => setAnchorEl(null);

//handle open and close of report component
const[openReportComponent,setOpenReportComponent]=useState(false);

const handleReportOpen=()=>{
  setOpenReportComponent(true);
}
const handleReportClose=()=>{
  setOpenReportComponent(false);
}

  return (
    <WidgetWrapper m="2rem 0" onClick={()=>{navigate("/eachPost")}}>
    <Box display="flex" gap={5} fontSize={32} >
      <Typography display="flex-start" variant="h3" fontWeight={600}>
        This is the title of the review has to be one line
      </Typography>
      <IconButton display="flex-end" onClick={handleClick}>
        <MoreHorizOutlined/>
      </IconButton>
      <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "center", horizontal: "left" }}
              >
                <MenuItem onClick={handleReportOpen}>Report the post</MenuItem>
                <MenuItem onClick={handleClose}>I'm not interested</MenuItem>
                <MenuItem onClick={handleClose}>Follow the poster</MenuItem>
                <MenuItem onClick={handleClose}>detail of the post</MenuItem>
              </Menu>

              {/* report component accept */}
              <ReportComponent
                onClose={handleReportClose}
                open={openReportComponent}
              />
      </Box>
      <Typography sx={{ mt: "1rem" }} variant="h6">
        this description is for the review and experience.this description is
        for the review and experience. this description is for the review and
        experience. this description is for the review and experience.
      </Typography>
      <img
        width={widthPost||"100%"}
        height={heightPost||"auto"}
        alt="post"
        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        src={postImage}
      />
      <Box display="flex" alignItems="center" gap="0.3rem">
        <UserImage size={40} />
        <Typography variant="body1">Gelila Girma</Typography>
        <Typography variant="body2" color="textSecondary">
          Addis Ababa 6 hours ago
        </Typography>
      </Box>
      <Box marginTop={1}>
        <RatingComponent />
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
            <IconButton onClick={handleCommentIconClick}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>45</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
          <Tooltip title="Share">
        <IconButton onClick={handleShareClick}>
          <ShareOutlined />
        </IconButton>
      </Tooltip>
      {shareOpen && <ShareButtons />}
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton>
              <BookmarkAddOutlinedIcon />
            </IconButton>
          </FlexBetween>
          <CommentModal
      open={isCommentModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleCommentSubmit}
    />
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostWidget;
