import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, IconButton, Switch } from "@mui/material";
import { Add, BarChart, TrendingUp, Gamepad } from "@mui/icons-material";
import { LineChart, Line, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const stats = [
    { title: "Total Games", value: 25, icon: <Gamepad fontSize="large" /> },
    { title: "Total Clicks", value: 5400, icon: <BarChart fontSize="large" /> },
    { title: "Trending Game", value: "Cyberpunk 2077", icon: <TrendingUp fontSize="large" /> },
    { title: "Latest Added", value: "Elden Ring", icon: <Gamepad fontSize="large" /> },
  ];

  const gameClicks = [
    { name: "Jan", clicks: 200 },
    { name: "Feb", clicks: 350 },
    { name: "Mar", clicks: 400 },
    { name: "Apr", clicks: 600 },
    { name: "May", clicks: 800 },
  ];

  return (
    <Box sx={{ padding: 3, background: darkMode ? "#121212" : "#f4f4f4", minHeight: "100vh", color: darkMode ? "white" : "black" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Dashboard</Typography>
    
      </Box>

      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2, background: darkMode ? "#333" : "#fff", boxShadow: 3 }}>
              <IconButton>{stat.icon}</IconButton>
              <Box ml={2}>
                <Typography variant="body1">{stat.title}</Typography>
                <Typography variant="h6" fontWeight="bold">{stat.value}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, background: darkMode ? "#333" : "#fff", boxShadow: 3 }}>
            <Typography variant="h6" mb={2}>Game Clicks Over Time</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={gameClicks}>
                <XAxis dataKey="name" stroke={darkMode ? "white" : "black"} />
                <YAxis stroke={darkMode ? "white" : "black"} />
                <Tooltip />
                <Line type="monotone" dataKey="clicks" stroke="#007bff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, background: darkMode ? "#333" : "#fff", boxShadow: 3 }}>
            <Typography variant="h6" mb={2}>Top Games</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <ReBarChart data={gameClicks}>
                <XAxis dataKey="name" stroke={darkMode ? "white" : "black"} />
                <YAxis stroke={darkMode ? "white" : "black"} />
                <Tooltip />
                <Bar dataKey="clicks" fill="#28a745" />
              </ReBarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
      
      <Box mt={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Button variant="contained" color="primary" startIcon={<Add />}>Add New Game</Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
