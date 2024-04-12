import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

const Setting = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      mt={10}
      marginLeft={!isMobile ? "400px" : "10px"}
      marginRight={isMobile ? "10px" : null}
      align="center"
    >
      <Box>
        <Box alignItems="center">
          <Typography variant="h3" mb={5}>
            Setting and Privacy
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
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
        <Typography>
          Manage your connected experiences and account settings across our
          technologies
        </Typography>
        <Link variant="body2">
          <Typography>Personal Details</Typography>
        </Link>
        <Link>
          <Typography>Password and Security</Typography>
        </Link>
        <Link>
          <Typography>Ad Preferences</Typography>
        </Link>
        <Link>
          <Typography>Verification</Typography>
        </Link>
        <Link>
          <Typography>Notification Setting</Typography>
        </Link>
        <Link>
          <Typography>Message Setting</Typography>
        </Link>
        <Link>
          <Typography>Reports Setting</Typography>
        </Link>
      </Box>
      <Box>
        <Box display="flex" alignItems="center">
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
        <Typography>
          Our tools help you control and manage your privacy
        </Typography>
        <Link>
          <Typography>Privacy checkup</Typography>
        </Link>
      </Box>
      <Box>
        <Box display="flex" alignItems="center">
          <Typography
            variant="body2"
            style={{ margin: "0 10px" }}
            fontWeight={600}
            fontSize={18}
          >
            Preference
          </Typography>
          <Divider style={{ flexGrow: 1 }} />
        </Box>
        <Typography>Customize your experience on ExperienceHub</Typography>
        <Link>
          <Typography>Language and Region</Typography>
        </Link>
        <Link>
          <Typography>Data Usage and media Quality</Typography>
        </Link>
        <Link>
          <Typography>Accessibility</Typography>
        </Link>
        <Link>
          <Typography>Archiving and Downloading</Typography>
        </Link>
        <Link>
          <Typography>Verification</Typography>
        </Link>

        <Box display="flex" alignItems="center">
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
        <Typography>Additional information and help is below.</Typography>
        <Link>
          <Typography>Help</Typography>
        </Link>
        <Link>
          <Typography>Account Status</Typography>
        </Link>
        <Link>
          <Typography>About</Typography>
        </Link>
        <Box display="flex" alignItems="center">
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
        <Typography>Authentication related things.</Typography>
        <Link>
          <Typography>Add Account</Typography>
        </Link>
        <Link>
          <Typography>LogOut username</Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Setting;
