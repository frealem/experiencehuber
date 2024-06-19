import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";
import TitleTwoLine from "../../../components/titleTwoLine";
import Map from "./map";
import {format} from 'date-fns'
import RatingComponent from "../../../components/Rating";

const RightEachPost = ({post}) => {
  const theme=useTheme();
  return (
    <>
      <Box mb={5} marginLeft="20px">
        <Typography>Rating:</Typography><RatingComponent value={post?.rating}/>
        <Box display="flex" alignItems="center" mb={5}>
          <Divider style={{ flexGrow: 1 }} />
          <Typography
            variant="body2"
            style={{ margin: "0 10px" }}
            fontSize={28}
          >
            {format(post?.createdAt,'MMM d yyyy')}
          </Typography>
          <Divider style={{ flexGrow: 1 }} />
        </Box>
        <Box mb={5}>
          <TitleTwoLine variant="h4" fontWeight={600} fontSize={24} 
          color={theme.palette.secondary[100]}>
            {post?.title}
          </TitleTwoLine>
        </Box>
        <Box mb={5}>
          <Box width="100%" minWidth="80%" minHeight="300px">
          <Typography style={{ whiteSpace: "pre-line" }}>
            {post?.description}
          </Typography>
          </Box>          
          <Box display="flex" alignItems="center" mb={5}>
            <Divider style={{ flexGrow: 1 }} />
            <Typography
              variant="h3"
              style={{ margin: "0 10px" }}
              fontSize={24}
              color={theme.palette.secondary[100]}
            >
              Post Location Map
            </Typography>
            <Divider style={{ flexGrow: 1 }} />
          </Box>
          <Box>
            <Map location={post?.location}/>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RightEachPost;
