import React, { useCallback, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Notifications,
  MoreOutlined,
  MoreHorizRounded,
  MoreVertOutlined,
  Category,
} from "@mui/icons-material";
import FlexBetween from "./Flexbetween";
import { useDispatch} from "react-redux";
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
import Sidebar from "./sidebar";



const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = useCallback((event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
  }, [anchorEl]);
  
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [messageOpen, setMessageOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const token = localStorage.getItem('accessToken')
  
  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/')
  };

  const handleLogin = () => {
navigate('/authpage')
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMenu = () => {
setIsSidebarOpen(!isSidebarOpen)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
    navigate('/')
  }
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
              <IconButton onClick={()=>navigate('/categorychoice')}>
                <Category sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton onClick={handleClick}><MoreVertOutlined color="secondary"/></IconButton>
              <Box>
                
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                 <Box><MenuItem onClick={handleLogin}>Log In</MenuItem>
                 <MenuItem onClick={handleLogin}>Sign Up</MenuItem>
                      <MenuItem onClick={handleLogout}>Log Out</MenuItem></Box>

                </Menu>
              </Box>
            </Box>
          </>
) :

//for mobile users
(
          <Box>
            <FlexBetween gap="3rem" padding="2rem 4%">
             
                <Box>
                  <Box><Box display='flex' justifyContent='space-evenly' gap={5}>
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
                    <FlexBetween >
                    <IconButton onClick={handleClick}><MoreVertOutlined color="secondary" fontSize="32"/></IconButton>
                    </FlexBetween>
                    </Box>
                    <Box>
                      
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                 <Box>
                  <MenuItem onClick={handleLogin}>Log In</MenuItem>
                 <MenuItem onClick={handleLogin}>Sign Up</MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  <MenuItem onClick={()=>navigate('/categorychoice')}>Category</MenuItem>
                  <MenuItem onClick={handleLogout}><IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
              </IconButton></MenuItem>
                 
                      </Box>

                </Menu>
              </Box>
                  </Box>
                </Box>
              
            </FlexBetween>
          </Box>
        )
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;