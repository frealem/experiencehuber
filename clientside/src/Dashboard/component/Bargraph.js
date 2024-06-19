import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Typography, Box, Paper } from "@mui/material";



const BarGraph = ({data}) => {
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Experience Statistics
      </Typography>
      <Paper sx={{ p: 2 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="countUser" fill="#8884d8" name="Users" />
            <Bar dataKey="countPost" fill="#82ca9d" name="Posts" />
            <Bar dataKey="countReview" fill="#ffc658" name="Reviewers" />
            <Bar dataKey="countLike" fill="#ff6f69" name="Likes" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default BarGraph;