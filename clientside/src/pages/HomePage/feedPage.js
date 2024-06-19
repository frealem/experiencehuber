import { Box, useMediaQuery, TextField, InputAdornment } from "@mui/material";
import TopPostBox from "../../components/topPostBox";
import MyButton from "../../components/myButton";
import PostsWidget from "../widgets/postsWidget";
import { useEffect, useState, useCallback } from "react";
import LeftFeedWidget from "../widgets/leftFeedWidget";
import { getLatestPostApi, getPostsByPreference, isLiked, searchPosts } from "../../components/States/postIntegration/postApi";
import { Search } from "@mui/icons-material";

const FeedPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [showOverlay, setShowOverlay] = useState(false);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const accesToken = localStorage.getItem('accessToken');

  const handleNewPost = () => {
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
  };

  const findPostWithNoAccess = async() =>{
    const response = await getLatestPostApi();
    setPosts(response.results)
  }

  const debouncedSearchPosts = useCallback(
    debounce(async (query) => {
      if (query) {
        const page = 1;
        const pageSize = 20;
        const postsData = await searchPosts(query, page, pageSize);
        setPosts(postsData.results);
      } else {
        findPostWithNoAccess();
      }
    }, 500),
    []
  );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    debouncedSearchPosts(e.target.value);
  };

  useEffect(()=>{
    try{
      const findPost = async() => {      
      const response = await getPostsByPreference();
      console.log(response.results)
      response.results.forEach(async element => {
        try{
          const res = await isLiked(element._id)
          const result = {
            ...element,
          isLiked: res.res
        }
        setPosts((prev)=> [...prev,result]);
        }catch(error){

        }
      });
    }
    if(accesToken){
      findPost()
    }else{
      findPostWithNoAccess()
    }
  }catch(error){
  }
  },[accesToken]);
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
          {!isNonMobileScreens && <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '& > *': { 
          margin:'10px',
        },
      }}
    ><LeftFeedWidget/></Box>}
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
                backgroundColor="rgba(0, 0, 0, 0.5)"
              >
                <MyButton onClick={handleNewPost}>New Post Overlay</MyButton>
              </Box>
            )}
          </Box>
          <TextField
          
          sx={{
            borderColor:'red',
            margin:"10px"
          }}
            value={query}
            onChange={handleQueryChange}
            placeholder="Search posts..."
            InputProps={{
              startAdornment: <Search />,
            }}
          />
          <Box sx={{ height: '1000px', overflowY: 'auto' ,scrollbarWidth: 'none', '-ms-overflow-style': 'none'}}>
          <PostsWidget wrapperHeight={'auto'} posts={posts} setPosts={setPosts}/>
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

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}