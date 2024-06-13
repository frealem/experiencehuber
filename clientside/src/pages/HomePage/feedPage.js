import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserWidget from "../widgets/userWidget";
import TopPostBox from "../../components/topPostBox";
import MyButton from "../../components/myButton";
import PostsWidget from "../widgets/postsWidget";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { useEffect, useState } from "react";
import LeftFeedWidget from "../widgets/leftFeedWidget";
import { getUser } from "../../components/States/userIntegration/userSlice";

const FeedPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  //   const { _id, picturePath } = useSelector((state) => state.user);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleNewPost = () => {
    // Logic to handle a new post being added
    setShowOverlay(true);

    // Simulating a delay before hiding the overlay
    setTimeout(() => {
      setShowOverlay(false);
    }, 1000); // Adjust the duration as needed
  };
  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          flexBasis={isNonMobileScreens ? "60%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <TopPostBox />
          <Box position="relative" >
            {showOverlay && (
              <Box
                position="fixed"
                top={0}
                left={0}
                right={0}
                bottom={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={999}
                backgroundColor="rgba(0, 0, 0, 0.5)" // Adjust the overlay background color and transparency
              >
                <MyButton onClick={handleNewPost}>New Post Overlay</MyButton>
              </Box>
            )}
          </Box>
          <Box sx={{ height: '1000px', overflowY: 'auto' ,scrollbarWidth: 'none', '-ms-overflow-style': 'none'}}>
          <PostsWidget />
          </Box>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="35%" sx={{ height: '1000px', overflowY: 'auto' ,scrollbarWidth: 'none', '-ms-overflow-style': 'none'}}>
            <LeftFeedWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FeedPage;
