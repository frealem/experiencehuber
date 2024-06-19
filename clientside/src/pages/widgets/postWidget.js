import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  FormatAlignCenter,
  MoreHorizOutlined,
  MoreVertOutlined,
  ShareOutlined,
  Favorite,
  Delete,
  Upload
} from "@mui/icons-material";
import { Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";

import postImage from "../../assets/images/pizza1.jpg";
import StarIcon from "@mui/icons-material/Star";
import UserImage from "../../components/userImage";
import FlexBetween from "../../components/Flexbetween";
import WidgetWrapper from "../../components/widgetWrapper";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import RatingComponent from "../../components/Rating";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentModal from "../HomePage/component/feedComment";
import ShareButtons from "../HomePage/component/feedShare";
import ReportComponent from "../HomePage/component/report";
import {format} from 'timeago.js';
import { createPostApi, deletePostApi, likeApi } from "../../components/States/postIntegration/postApi";
import { getOneUserApi } from "../../components/States/userIntegration/userApi";

const PostWidget = ({widthPost, heightPost, wrapperHeight, post, setPosts, type, onDelete, onPost}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const navigate = useNavigate();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [user, setUser] = useState(false);

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

const handleLike = async()=>{
    try {
      const {res, like} = await likeApi(post._id);
      post.like = like;
      post.isLiked = res;
      setPosts((prev)=>{
      let posts = [...prev];
      const a = posts.indexOf((item) => item._id === post._id)
      console.log(a)
      posts[a] = post;
      return posts;
      })
    } catch (error) {
      
    }
}
  useEffect(()=>{
    const getOneUser = async()=>{
      const userData = await getOneUserApi(post.posterId);
      setUser(userData);
    }
    getOneUser();
  },[])

  const handlePost = async()=>{
    onPost();
  }

  const handleDelete = ()=>{
    onDelete()
  }

  return (
    <WidgetWrapper m="2rem 0" height={wrapperHeight || '600px'} minWidth='300px'>
    <Box display="flex" gap={5} fontSize={32} >
      <Typography display="flex-start" variant="h3"  maxHeight='70px' overflow='hidden' fontWeight={600} onClick={()=>navigate('/eachPost',{replace: true, state:post})}>
        {post?.title}
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
                {type && type == '0'? (
                <MenuItem onClick={handleDelete}>Delete post</MenuItem>):<></>}
                {type && type == '1'? (<>
                <MenuItem onClick={handlePost}>Add to post</MenuItem>
                <MenuItem onClick={handleDelete}>Delete post</MenuItem></>):<></>}
              </Menu>

              {/* report component accept */}
              <ReportComponent
                onClose={handleReportClose}
                open={openReportComponent}
                post={post}
              />
      </Box>
      <Typography sx={{ mt: "1rem", height:'150px', overflow:'hidden' }} variant="h6">
       {post?.description}
      </Typography>
      <img
        onClick={()=>navigate('/eachPost', {replaces: true, state: post})}
        width={widthPost||"100%"}
        height={heightPost||"600px"}
   
        alt="post"
        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" ,objectFit:"cover"}}
        src={`http://localhost:5000/uploads/${post.imageURL[0]}`}
      />
      <Box display="flex" alignItems="center" gap="0.3rem" onClick={()=>navigate('/othersprofile', {replace: true, state: user})}>
        <UserImage size={40} image={user?.profilePictuerURL} />
        <Typography variant="body1">{user?.userName}</Typography>
        <Typography variant="body2" color="textSecondary">
          {format(post.createdAt)}
        </Typography>
      </Box>
      <Box marginTop={1}>
        <RatingComponent value={post.rating} />
      </Box>

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleLike}>
              {post.isLiked? (<Favorite/>):(<FavoriteBorderOutlined />)}             
            </IconButton>
            <Typography>{post.like? post.like: 0}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleCommentIconClick}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{post.share? post.share: 0}</Typography>
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
