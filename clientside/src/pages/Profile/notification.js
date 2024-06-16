import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, useTheme, useMediaQuery, IconButton } from "@mui/material";
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from "@mui/icons-material";
import TitleTwoLine from '../../components/titleTwoLine';
import { getNotificationsApi } from '../../components/States/userIntegration/userApi';
import {format} from 'date-fns' 


export const Notification = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(()=>{
    const getNotifications = async() =>{
      setNotifications(await getNotificationsApi());
    }
    getNotifications();
  },[])

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Box mt={5} marginLeft={!isMobile ? "400px" : "10px"} marginRight={isMobile ? "10px" : null}>
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
        {notifications? (
        
          notifications.map((nof) => (
            <React.Fragment key={nof.id}>
            <Box width="100%" margin={2} borderRadius={10} border={1} borderColor={theme.palette.secondary.main} p={2} marginRight={isMobile ? "10px":undefined}>
              <TitleTwoLine variant="h6" component="h2" fontWeight="bold"  color={theme.palette.secondary.main}>
                {nof.title}
              </TitleTwoLine>
              <Typography variant="body1" component="p" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', '-webkit-line-clamp': expanded ? 'unset' : '2', '-webkit-box-orient': 'vertical' }}>
                {nof.detail}
              </Typography>
              {nof.detail.toString().length > 50 && (
                <IconButton onClick={handleExpand} size="small">
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              )}
              <Typography variant="body2" component="p" align="right">
                {format(nof.createdAt, 'MMM d yyy')}
              </Typography>
              </Box>
            </React.Fragment>
          ))):"No notifications"}
      </Box>
    </>
  );
};