import React from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
   Menu, MenuItem 
} from "@mui/material";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  CloseOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  MenuBookOutlined,
  MenuOpenOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../../../components/States/themeSlice";
import { styled } from "@mui/system";

const navItems = [
  {
    text: "Edit Profile",
    icon: <ModeEditOutlineOutlinedIcon />,
    link: "editprofile",
  },
  {
    text: "My Posts",
    icon: <PostAddOutlinedIcon />,
    link: "myposts",
  },
  {
    text: "Notification",
    icon: <MessageOutlinedIcon />,
    link: "notification",
  },
  {
    text: "Favorite List",
    icon: <FavoriteOutlinedIcon />,
    link: "favoritelist",
  },
  {
    text: "Password and Security",
    icon: <SecurityOutlinedIcon />,
    link: "security",
  },
  {
    text: "Setting and Privacy",
    icon: <SettingsOutlined />,
    link: "setting",
  },
];

const ProfileLayout = ({ text }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(!isMobile);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setActive(pathname.substring(1));
    setIsOpen(!isMobile);
  }, [pathname, isMobile]);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };
 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
      transformOrigin: "left top",
    },
  }));

  return (
    <>
      <Box
        display={isNonMobile ? "flex" : "block"}
        width="100%"
        height="100%"
        boxShadow="none"
      >
        <Box display="flex" boxShadow="none">
          <Box position="fixed" top={0} left={0} width="100%" boxShadow="none" backgroundColor={theme.palette.background.paper} zIndex={999}>
            <Toolbar sx={{ justifyContent: "space-between" }} >
              {isMobile ? (
                <IconButton onClick={handleDrawerToggle}>
                  <MenuOutlined />
                </IconButton>
              ) : (
                <Typography
                  color={theme.palette.secondary[300]}
                  fontWeight={400}
                >
                  Poster Profile
                </Typography>
              )}
              <Typography
                color={theme.palette.secondary[300]}
                fontWeight={600}
                fontSize={24}
              >
                ExperienceHub
              </Typography>
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
              </IconButton>
            </Toolbar>
          </Box>
        </Box>
        <Outlet />

        <Drawer
          open={isOpen}
          onClose={handleDrawerToggle}
          onClick={isMobile ? handleDrawerToggle : null}
          variant="persistent"
          anchor="left"
          sx={{
            width: "400px",
            "& .MuiDrawer-paper": {
              color: theme.palette.grey[50],
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
            },
          }}
        >
          <Toolbar />
          <Box
            sx={{
              width: "100%",
              paddingTop: "0",
              borderWidth: isNonMobile ? 0 : "2px",
            }}
          >
            <Typography
              color={theme.palette.secondary[300]}
              fontWeight={600}
              fontSize={24}
              marginTop={-5.5}
              marginLeft={6}
              marginBottom={3}
            >
              Poster Profile
            </Typography>
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
        </Drawer>
      </Box>
    </>
  );
};

export default ProfileLayout;
