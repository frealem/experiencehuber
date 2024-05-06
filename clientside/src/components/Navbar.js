import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  NotificationAddOutlined,
  Notifications,
} from "@mui/icons-material";
import FlexBetween from "./Flexbetween";
import { useDispatch } from "react-redux";
import { setMode } from "./States/themeSlice";
import profileImage from "../assets/images/chatapp.jpeg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AuthPage from "../pages/authPage";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import SearchComponent from "./Search";
import MessagePage from "../pages/messagePage/message";
import MessageOutlined from "@mui/icons-material/MessageOutlined";


const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openSearch, setOpenSearch] = useState(null);
  const [activeSearch, setActiveSearch] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const handleActiveSearchClose=()=>{
    setActiveSearch(false)
  }
  const handleMessageOpen=()=>{
    setMessageOpen(true)
  }
  const handleMessageClose=()=>{
    setMessageOpen(false)
  }
  const handleAuth = () => {
    navigate("/authpage");
  };

  // const handleOpenMessage=()=>{
  //   setMessageOpen(true)
  // }
  // const handleCloseMessage=()=>{
  //   setMessageOpen(false)
  // }

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    ><Toolbar sx={{ justifyContent: "space-between" }}>
      {!isMobile ? (
        <>
        <FlexBetween gap="9rem">
          {/* LEFT SIDE */}
          <FlexBetween gap="3rem" padding="2rem 6%">
            {!isSidebarOpen && (
              <FlexBetween>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  color={theme.palette.secondary[100]}
                >
                  ExperienceHub
                </Typography>
              </FlexBetween>
            )}
            <FlexBetween
              backgroundColor={theme.palette.secondary[900]}
              borderRadius={15}
              gap="3rem"
              p="0.1rem 1.5rem"
              onClick={activeSearch}
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
              
            </FlexBetween>
          </FlexBetween>

          {/* RIGHT SIDE */}
          <FlexBetween gap="1.3rem">
          <IconButton onClick={()=>{navigate('/notification')}}>
              <Notifications/>
            </IconButton>
            <IconButton onClick={handleMessageOpen}>
              <MessageOutlined/>
            </IconButton>
<MessagePage  open={messageOpen} onClose={handleMessageClose}/>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>

            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    Gelila Daniel
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    @username
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          </FlexBetween>
          </FlexBetween>
        </>
        
      ) : (
          <Box>
            <FlexBetween gap="3rem" padding="2rem 4%">
              {!openSearch ? (
                <Box>
                <FlexBetween gap="1rem">
                  <FlexBetween>
                    <IconButton>
                      <MenuIcon />
                    </IconButton>
                  </FlexBetween>
                  <FlexBetween>
                    <Typography
                      variant="h3"
                      fontWeight={900}
                      color={theme.palette.secondary[100]}
                      onClick={()=>navigate('/')}
                    >
                      ExperienceHub
                    </Typography>
                  </FlexBetween>
                  <FlexBetween>
                    <IconButton onClick={()=>setOpenSearch(true)}>
                      <Search />
                    </IconButton>
                  </FlexBetween>
                  </FlexBetween>
                </Box>
              ) : (
                <Box>
                <FlexBetween gap="1rem">
                  <FlexBetween>
                    <IconButton onClick={()=>setIsSidebarOpen(true)}>
                      <MenuIcon />
                    </IconButton>
                  </FlexBetween>
                  <FlexBetween
                    backgroundColor={theme.palette.secondary[900]}
                    borderRadius={15}
                    gap="3rem"
                    p="0.1rem 1.5rem"
                  >
                    <InputBase placeholder="Search..." />
                    <IconButton>
                      <Search />
                    </IconButton>
                  </FlexBetween>
                  </FlexBetween>
                </Box>
              )}
            </FlexBetween>
          </Box>
        )
      }
      {activeSearch ? <SearchComponent onClose={handleActiveSearchClose}/>:null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
