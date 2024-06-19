import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FormatShapesOutlinedIcon from "@mui/icons-material/FormatShapesOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./Flexbetween";
import UserWidget from "../pages/widgets/userWidget";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./States/userIntegration/userSlice";
import { PeopleOutlined, PersonOutline } from "@mui/icons-material";

const type = localStorage.getItem('type')

const navItems = [
 
  {
    text: "Menu",
    icon: null,
    link: "null",
  },
  {
    text: "My Posts",
    icon: <PostAddOutlinedIcon />,
    link: "myposts",
  },
  
  {
    text: "My Liked Post",
    icon: <FavoriteOutlinedIcon />,
    link: "favoritelist",
  },
  {
    text: "Drafted Posts",
    icon: <DraftsOutlinedIcon />,
    link: "draftposts",
  },
  {
    text: "Message",
    icon: <MessageOutlinedIcon />,
    link: "message",
  },
  {
    text: "Dashboard",
    icon: <PersonOutline />,
    link: "reportmanagement",
  },
];
const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const dispatch = useDispatch();
  const token=localStorage.getItem("accessToken")

  const handleAccount=()=>{
    navigate('/authpage')
  }
useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
return (
    <Box component="nav">
      {isSidebarOpen && (
        <Box
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.grey[50],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <FlexBetween>
                    <Typography
                      variant="h3"
                      fontWeight={900}
                      color={theme.palette.secondary[100]}
                    >
                      ExperienceHub
                    </Typography>
                  </FlexBetween>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
              <Box pt={5}>{token?
                <UserWidget/>:<Box  onClick={handleAccount}><IconButton ><PeopleOutlined/></IconButton>add an account</Box>
              }
                
              </Box>
            </Box>
            <List>
              {navItems.map(({ text, icon, link }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 3rem", fontWeight: "bold" }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = link.toLowerCase();

                return (
                  <ListItem key={link} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        marginBottom: "15px",
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                          fontSize: "32px",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                    {
                      (link==="setting") ? (
                        <Box>
                        </Box>):null
                    }
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;