import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
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
  Select,
} from "@mui/material";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import SearchComponent from "./Search";
import MessagePage from "../pages/messagePage/message";
import MessageOutlined from "@mui/icons-material/MessageOutlined";
import { setLogout } from "./States/authIntegration/authSlice";



const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
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
  const [selectedOption, setSelectedOption] = useState('');
  const { loading, error } = useSelector((state) => state.auth);
  const token = localStorage.getItem('accessToken')
  
  const handleLogout = () => {
    dispatch(setLogout());
    handleClose();
    navigate('/')
  };

  const handleLogin = () => {
    if (!token) {
      navigate('/authpage')
      handleClose();
    }
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleActiveSearchClose = () => {
    setActiveSearch(false)
  }
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMenu = () => {
setIsSidebarOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
    navigate('/')
  }
// const handleSearch=()=>{
//   navigate("/notification")
// }
const handleNotification=()=>{
navigate("/notification")
}

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    ><Toolbar>
        {!isMobile ? (
          <>
            {/* RIGHT SIDE */}
            <Box gap="1rem" display="flex" pl="50%" justifyContent="flex-end" sx={{ flexDirection: "row" }}>
              <Select
                value={selectedOption}
                onChange={handleOptionChange}
                displayEmpty
                renderValue={(value) => (value === "" ? "Unread" : value)}
              >
                <MenuItem value="" disabled>
                  Select a status
                </MenuItem>
                <MenuItem value="option1">Fixed</MenuItem>
                <MenuItem value="option2">Onprocess</MenuItem>
                <MenuItem value="option3">Unread</MenuItem>
              </Select>
              <IconButton>
                <Search />
              </IconButton>
              <IconButton onClick={handleNotification}>
                <Notifications />
              </IconButton>
              <IconButton onClick={handleMessageOpen}>
                <MessageOutlined />
              </IconButton>
              <MessagePage open={messageOpen} onClose={handleMessageClose} />
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

              <Box>
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
                  <ArrowDropDownOutlined
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "20px",
                    }}
                  />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  {token ? (<Box><MenuItem onClick={handleLogin}>Sign Up</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem></Box>) : (<Box><MenuItem onClick={handleLogin}>Log In</MenuItem><MenuItem onClick={handleLogin}>Sign Up</MenuItem>
                      <MenuItem onClick={handleLogout}>Log Out</MenuItem></Box>)}



                </Menu>
              </Box>
            </Box>
          </>

        ) : (
          <Box>
            <FlexBetween gap="3rem" padding="2rem 4%">
              {!openSearch ? (
                <Box>
                  <FlexBetween gap="1rem">
                    <FlexBetween>
                      <IconButton onClick={handleMenu}>
                        <MenuIcon />
                      </IconButton>
                    </FlexBetween>
                    <FlexBetween>
                      <Typography
                        variant="h3"
                        fontWeight={900}
                        color={theme.palette.secondary[100]}
                        onClick={() => navigate('/')}
                      >
                        ExperienceHub
                      </Typography>
                    </FlexBetween>
                    <FlexBetween>
                      <IconButton onClick={() => setOpenSearch(true)}>
                        <Search />
                      </IconButton>
                    </FlexBetween>
                  </FlexBetween>
                </Box>
              ) : (
                <Box>
                  <FlexBetween gap="1rem">
                    <FlexBetween>
                      <IconButton onClick={() => setIsSidebarOpen(true)}>
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
        {activeSearch ? <SearchComponent onClose={handleActiveSearchClose} /> : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
