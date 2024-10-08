import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/Flexbetween";

const DashBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="200px"
      justifyContent="space-between"
      p="1.25rem 1rem"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default DashBox;