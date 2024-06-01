import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import ReportIcon from "@mui/icons-material/Report";
import PublicIcon from "@mui/icons-material/Public";
import LanguageIcon from "@mui/icons-material/Language";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ArchiveIcon from "@mui/icons-material/Archive";
import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const settings = [
  {
    icon: <PersonIcon />,
    text: "Personal Details",
  },
  {
    icon: <SecurityIcon />,
    text: "Password and Security",
  },
  {
    icon: <SettingsIcon />,
    text: "Ad Preferences",
  },
  {
    icon: <EmailIcon />,
    text: "Verification",
  },
  {
    icon: <NotificationsIcon />,
    text: "Notification Settings",
  },
  {
    icon: <EmailIcon />,
    text: "Message Settings",
  },
  {
    icon: <ReportIcon />,
    text: "Reports Settings",
  },
];

const toolsAndResources = [
  {
    icon: <HelpIcon />,
    text: "Privacy Checkup",
  },
];

const preferences = [
  {
    icon: <LanguageIcon />,
    text: "Language and Region",
  },
  {
    icon: <DataUsageIcon />,
    text: "Data Usage and Media Quality",
  },
  {
    icon: <AccessibilityIcon />,
    text: "Accessibility",
  },
  {
    icon: <ArchiveIcon />,
    text: "Archiving and Downloading",
  },
];

const moreInfoAndSupport = [
  {
    icon: <HelpIcon />,
    text: "Help",
  },
  {
    icon: <AccountCircleIcon />,
    text: "Account Status",
  },
  {
    icon: <InfoIcon />,
    text: "About",
  },
];

const login = [
  {
    icon: <AddCircleIcon />,
    text: "Add Account",
  },
  {
    icon: <LogoutIcon />,
    text: "Log Out username",
  },
];

const Setting = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      mt={10}
      marginLeft={!isMobile ? "400px" : "10px"}
      marginRight={isMobile ? "10px" : null}
    >
      <Box>
        <Box display="flex" justifyContent="center" mb={3}>
          <SettingsIcon fontSize="medium" color={theme.palette.secondary[300]} mr={2}/>
          <Typography variant="h4" color={theme.palette.secondary[300]} >
            Setting and Privacy
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <Typography
            variant="body2"
            style={{ margin: "0 10px" }}
            fontWeight={600}
            fontSize={18}
          >
            Account Centre
          </Typography>
          <Divider style={{ flexGrow: 1 }} />
        </Box>

        <Typography variant="body2" mb={2}>
          Manage your connected experiences and account settings across our
          technologies
        </Typography>

        <List>
          {settings.map((item, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              to="/"
              style={{ textDecoration: "none" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center" mt={3} mb={2}>
          <Typography
            variant="body2"
            style={{ margin: "0 10px" }}
            fontWeight={600}
            fontSize={18}
          >
            Tools and Resources
          </Typography>
          <Divider style={{ flexGrow: 1 }} />
        </Box>

        <Typography variant="body2" mb={2}>
          Our tools help you control and manage your privacy
        </Typography>

        <List>
          {toolsAndResources.map((item, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              to="/"
              style={{ textDecoration: "none" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center" mt={3} mb={2}>
          <Typography
            variant="body2"
            style={{ margin: "0 10px" }}
            fontWeight={600}
            fontSize={18}
          >
            Preferences
          </Typography>
          <Divider style={{ flexGrow: 1 }} />
        </Box>

        <Typography variant="body2" mb={2}>
          Customize your experience with preferences like language and region
        </Typography>

        <List>
          {preferences.map((item, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              to="/"
              style={{ textDecoration: "none" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center" mt={3} mb={2}>
          <Typography
            variant="body2"
            style={{ margin: "0 10px" }}
            fontWeight={600}
            fontSize={18}
          >
            More Info and Support
          </Typography>
          <Divider style={{ flexGrow: 1 }} />
        </Box>

        <Typography variant="body2" mb={2}>
          Get help, find out about our services, and get support for your
          account
        </Typography>

        <List>
          {moreInfoAndSupport.map((item, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              to="/"
              style={{ textDecoration: "none" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center" mt={3} mb={2}>
          <Typography
            variant="body2"
            style={{ margin: "0 10px" }}
            fontWeight={600}
            fontSize={18}
          >
            Login
          </Typography>
          <Divider style={{ flexGrow: 1 }} />
        </Box>

        <Typography variant="body2" mb={2}>
          Log out or add another account
        </Typography>

        <List>
          {login.map((item, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              to="/"
              style={{ textDecoration: "none" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Setting;