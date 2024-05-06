import React, { useState } from 'react';
import { Grid, Box, Typography, useTheme, useMediaQuery, IconButton } from "@mui/material";
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from "@mui/icons-material";
import TitleTwoLine from '../../components/titleTwoLine';

const notifications = [
  {
    id: 1,
    title: "fromadmin.com",
    notification:
      "This message is from experienceHub.com report issue. This message is from experienceHub.com report issue. This message is from experienceHub.com report issue. This message is from experienceHub.com report issue.",
    date: "Dec 30, 2024",
  },
  {
    id: 2,
    title: "example.com",
    notification: "This is an example notification.",
    date: "Jan 1, 2025",
  },
  {
    id: 3,
    title: "notification.com",
    notification: "Another notification here.",
    date: "Feb 15, 2025",
  },
  {
    id: 4,
    title: "important.com",
    notification: "An important notification.",
    date: "Mar 10, 2025",
  },
  {
    id: 5,
    title: "news.com",
    notification: "Breaking news: something happened!",
    date: "Apr 20, 2025",
  },
];

export const Notification = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Box mt={10} marginLeft={!isMobile ? "400px" : "10px"} marginRight={isMobile ? "10px" : null}>
        <Box>
          <Typography
            variant="h4"
            align="center"
            fontWeight="400"
            color={theme.palette.secondary.main}
            marginBottom={3}
          >
            Notifications
          </Typography>
        </Box>

        
          {notifications.map((nof) => (
            <React.Fragment key={nof.id}>
            <Box width="100%" margin={2} borderRadius={10} border={1} borderColor={theme.palette.secondary.main} p={2} marginRight={isMobile ? "10px":undefined}>
              <TitleTwoLine variant="h6" component="h2" fontWeight="bold"  color={theme.palette.secondary.main}>
                {nof.title}
              </TitleTwoLine>
              <Typography variant="body1" component="p" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', '-webkit-line-clamp': expanded ? 'unset' : '2', '-webkit-box-orient': 'vertical' }}>
                {nof.notification}
              </Typography>
              {nof.notification.length > 50 && (
                <IconButton onClick={handleExpand} size="small">
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              )}
              <Typography variant="body2" component="p" align="right">
                {nof.date}
              </Typography>
              </Box>
            </React.Fragment>
          ))}
      </Box>
    </>
  );
};