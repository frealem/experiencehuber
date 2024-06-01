import React from 'react';
import { Grid, Typography, Card, CardContent, useTheme, useMediaQuery, Box } from '@mui/material';
import { LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const SocialMedia = () => {
  // Sample data for social media analytics
  const followerGrowthData = [
    { month: 'Jan', followers: 200 },
    { month: 'Feb', followers: 150 },
    { month: 'Mar', followers: 300 },
    { month: 'Apr', followers: 250 },
  ];

  const engagementData = [
    { name: 'Likes', value: 100 },
    { name: 'Comments', value: 50 },
    { name: 'Shares', value: 20 },
    { name: 'Retweets', value: 30 },
  ];

  // Colors for pie chart
  const pieColors = ['#f44336', '#ff9800', '#4caf50', '#2196f3'];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    
    <Box mt={10}
      marginLeft={!isMobile ? "300px" : "10px"}
      marginRight={isMobile ? "10px" : null}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography  color={theme.palette.secondary.main} fontSize={18} mb={2}>Social Media Analytics</Typography>
        <Card>
          {/* Display overview metrics */}
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Typography  color={theme.palette.secondary.main} fontSize={14} mb={2} align="center">Engagement Metrics</Typography>
        <Card>
          <CardContent>
            <PieChart width={300} height={300}>
              <Pie
                data={engagementData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Typography  color={theme.palette.secondary.main} fontSize={14} mb={2} align="center">Followers Metrics</Typography>
        <Card>
          <CardContent>
            <LineChart width={700} height={300} data={followerGrowthData}>
              <Line type="monotone" dataKey="followers" stroke="#8884d8" />
            </LineChart>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </Box>
  );
};

export default SocialMedia;