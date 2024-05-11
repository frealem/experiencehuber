import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Typography, Box, Paper } from "@mui/material";

const data = [
  { name: "Users", value: 1500 },
  { name: "Posts", value: 1200 },
  { name: "Reviewers", value: 2000 },
  { name: "Likes", value: 1800 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f69"];

const PieGraph = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Pie Statistics
      </Typography>
      <Paper>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default PieGraph;