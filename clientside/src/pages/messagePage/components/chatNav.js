import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { ArrowBack, CallOutlined, MoreVert, Search } from "@mui/icons-material";

const ChatRoomNavbar = () => {
    const[isOnline,setIsOnline]=useState(true);
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar display="flex">
      <Box  sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" >
        <span style={{fontWeight:900,fontSize:18}}>  Jafer Hussien</span> <span style={{fontSize:8,color:"green",}}>{isOnline?"online":"Last seen recently"}</span>
        </Typography>
        </Box>
        <Box>
        <IconButton color="inherit">
          <Search/>
        </IconButton>
        <IconButton color="inherit">
          <CallOutlined/>
        </IconButton>
        <IconButton color="inherit">
          <MoreVert />
        </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChatRoomNavbar;