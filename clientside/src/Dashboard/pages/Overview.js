import React from "react";
import {
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { DownloadOutlined, GroupOutlined } from "@mui/icons-material";
import DashBox from "../component/DashBox";
import BarGraph from "../component/Bargraph";
import PieGraph from "../component/Piechart";

const Overview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box mt={10} ml={isMobile ? "10px" : "300px"} mr={isMobile ? "10px" : null}>
      <Box m="1.5rem 2.5rem" width="850px">
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography
              color={theme.palette.secondary[100]}
              fontSize={18}
              mb={2}
            >
              System Overview
            </Typography>
          </Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary[100],
              color: theme.palette.background[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      {/* main part */}
      <Box display="flex" justifyContent="space-between">
        {/* Left Half */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gridAutoRows="1fr"
          gap={2}
        >
          <Box>
            <DashBox
              title="Total Users"
              value="2000"
              increase="+14%"
              description="Since last week"
              icon={
                <GroupOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>
          <Box>
            <DashBox
              title="Total Users"
              value="2000"
              increase="+14%"
              description="Since last week"
              icon={
                <GroupOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>
          <Box>
            <DashBox
              title="Total Users"
              value="2000"
              increase="+14%"
              description="Since last week"
              icon={
                <GroupOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>
          <Box>
            <DashBox
              title="Total Users"
              value="2000"
              increase="+14%"
              description="Since last week"
              icon={
                <GroupOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>
        </Box>
        {/* Right Half */}
        <Box
          backgroundColor={theme.palette.background.alt}
          width="90%"
          borderRadius="0.55rem"
          m={2}
          p={1}
        >
          <PieGraph />
        </Box>
      </Box>
      {/* the remain row */}
      <Box
        backgroundColor={theme.palette.background.alt}
        width="97%"
        p={2}
        borderRadius="0.55rem"
        m={1}
      >
        <BarGraph />
      </Box>
    </Box>
  );
};

export default Overview;
