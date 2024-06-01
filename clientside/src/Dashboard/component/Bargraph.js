import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Typography, Box, Paper } from "@mui/material";

const data = [
  { month: "January", users: 1500, posts: 1200, reviewers: 2000, likes: 1800 },
  { month: "February", users: 1800, posts: 1400, reviewers: 2200, likes: 2100 },
  { month: "March", users: 2000, posts: 1600, reviewers: 2400, likes: 2300 },
  { month: "April", users: 2200, posts: 1800, reviewers: 2600, likes: 2500 },
  { month: "May", users: 2500, posts: 2000, reviewers: 2800, likes: 2800 },
];

const BarGraph = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Experience Statistics
      </Typography>
      <Paper sx={{ p: 2 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" name="Users" />
            <Bar dataKey="posts" fill="#82ca9d" name="Posts" />
            <Bar dataKey="reviewers" fill="#ffc658" name="Reviewers" />
            <Bar dataKey="likes" fill="#ff6f69" name="Likes" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default BarGraph;