import React, { useEffect, useState } from "react";
import Slider from "./component/slider";
//import { images } from "../../fakeData";
import FlexBetween from "../../components/Flexbetween";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RightEachPost from "./component/rightEachPost";
import LeftEachPost from "./component/leftEachPost";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../../components/States/themeSlice";
import {useLocation} from 'react-router-dom';
import { getPostComments } from "../../components/States/postIntegration/postApi";
import { getOneUserApi } from "../../components/States/userIntegration/userApi";

const EachPostPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const location = useLocation();
  const post = location.state;
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [postCreater, setPostCreater] = useState(null);

  useEffect(()=>{
    const initialize = async() => {
      const imgs = [...post.imageURL]
      let imgsURL = [];
      imgs.forEach((element)=> {
        imgsURL.push(`http://localhost:5000/uploads/${element}`)
      })
      setImages(imgsURL);
      setComments(await getPostComments(post._id));
      setPostCreater(await getOneUserApi(post.posterId));
    }
    initialize();
  },[])
  return (
    <>
      <FlexBetween>
        <Box p="20px 10px">
          <Typography
            variant="h3"
            fontWeight={900}
            color={theme.palette.secondary[100]}
          >
            ExperienceHub
          </Typography>
        </Box>
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined sx={{ fontSize: "25px" }} />
          ) : (
            <LightModeOutlined sx={{ fontSize: "25px" }} />
          )}
        </IconButton>
        <IconButton></IconButton>
      </FlexBetween>
      {images? (<Slider images={images} />): "loading..."}      
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : undefined}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {!isNonMobileScreens ? (
          <Box display="block">
            <RightEachPost post={post}/>
            <LeftEachPost comments={comments} postCreater={postCreater} setComments={setComments}/>
          </Box>
        ) : (
          <Box display="flex">
          {isNonMobileScreens && (
              <Box flexBasis="35%">
                <LeftEachPost postCreater={postCreater}comments={comments} setComments={setComments}/>
              </Box>
            )}
            <Box
              flexBasis={isNonMobileScreens ? "60%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <RightEachPost post={post}/>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default EachPostPage;
