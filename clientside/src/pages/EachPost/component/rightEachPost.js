import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";
import TitleTwoLine from "../../../components/titleTwoLine";
import Map from "./map";

const RightEachPost = () => {
  const theme=useTheme();
  return (
    <>
      <Box mb={5}>
        <Box display="flex" alignItems="center" mb={5}>
          <Divider style={{ flexGrow: 1 }} />
          <Typography
            variant="body2"
            style={{ margin: "0 10px" }}
            fontSize={28}
          >
            Decemeber 24 2024
          </Typography>
          <Divider style={{ flexGrow: 1 }} />
        </Box>
        <Box mb={5}>
          <TitleTwoLine variant="h4" fontWeight={600} fontSize={24} 
          color={theme.palette.secondary[100]}>
            This is the title Now you can use the Slider component in your
            application by passing an array of image strings to the images prop,
            similar to the previous examples.This is the title Now you can use
            the Slider component in your application by passing an array of
            image strings to the images prop, similar to the previous examples.
          </TitleTwoLine>
        </Box>
        <Box mb={5}>
          <Typography style={{ whiteSpace: "pre-line" }}>
            This is the title Now you can use the Slider component in your
            application by passing an array of image strings to the images prop,
            similar to the previous examples.This is the title Now you can use
            the Slider component in your application by passing an array of
            image strings to the images prop, similar to the previous examples.
            This is the title Now you can use the Slider component in your
            application by passing an array of image strings to the images prop,
            similar to the previous examples.This is the title Now you can use
            the Slider component in your application by passing an array of
            image strings to the images prop, similar to the previous examples.
            This is the title Now you can use the Slider component in your
            application by passing an array of image strings to the images prop,
            similar to the previous examples.This is the title Now you can use
            the Slider component in your application by passing an array of
            image strings to the images prop, similar to the previous examples.
            This is the title Now you can use the Slider component in your
            application by passing an array of image strings to the images prop,
            similar to the previous examples.This is the title Now you can use
            the Slider component in your application by passing an array of
            image strings to the images prop, similar to the previous examples.
            This is the title Now you can use the Slider component in your
            application by passing an array of image strings to the images prop,
            similar to the previous examples.This is the title Now you can use
            the Slider component in your application by passing an array of
            image strings to the images prop, similar to the previous examples.
          </Typography>
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
            <Map/>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RightEachPost;
