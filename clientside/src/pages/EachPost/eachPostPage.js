import React from "react";
import Slider from "./component/slider";
import { images } from "../../fakeData";
import FlexBetween from "../../components/Flexbetween";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import RightEachPost from "./component/rightEachPost";
import LeftEachPost from "./component/leftEachPost";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../../components/States/themeSlice";

const EachPostPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch=useDispatch();
  return (
    <><FlexBetween>
      <Box p="20px 10px" >
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
      <Slider images={images} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
      <Box
          flexBasis={isNonMobileScreens ? "35%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
            <LeftEachPost/>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="60%">
          <RightEachPost/>
          </Box>)}
          </Box>
    </>
  );
};

export default EachPostPage;
