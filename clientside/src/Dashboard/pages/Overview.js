import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Typography,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import FlexBetween from "../../components/Flexbetween";
import { DownloadOutlined, GroupOutlined } from "@mui/icons-material";
import DashBox from "../component/DashBox";

const data = [
  { name: "January", log: 400, analysis: 240, optimization: 320 },
  { name: "February", log: 300, analysis: 139, optimization: 221 },
  { name: "March", log: 200, analysis: 980, optimization: 229 },
  // Add more data as needed
];

const Overview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      mt={10}
      marginLeft={!isMobile ? "300px" : "10px"}
      marginRight={isMobile ? "10px" : null}
    >
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

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isMobile ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <DashBox
          title="Total Users"
          value="2000"
          increase="+14%"
          description="Since last week"
          icon={
            <GroupOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        /><Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >

        </Box>
        </Box>
    </Box>
  );
};

export default Overview;
{
  /* <Paper style={{ padding: '1rem' }}>
    <Typography variant="h6" gutterBottom>
      Overview
    </Typography>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="log" fill="#8884d8" />
        <Bar dataKey="analysis" fill="#82ca9d" />
        <Bar dataKey="optimization" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  </Paper> */
}
