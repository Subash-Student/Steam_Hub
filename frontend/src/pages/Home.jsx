import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, InputBase, Grid,
  Card, CardMedia, CardContent, Container, Box,
  MenuItem, Select
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = ["FPS", "MOBA", "Battle Royale", "RPG", "Adventure", "Strategy", "Simulation", "Sports", "Horror", "Indie"];

const fetchGames = async () => {
  try {
    const res = await axios.get("https://steam-hub-backend.vercel.app/api/all-games", {
      timeout: 5000,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const { data: games = [], isLoading, isError } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "" || game.category === selectedCategory || selectedCategory === "All";
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
      <Navbar />

      {/* Mobile Search Bar */}
      {showSearch && (
        <Box sx={{ display: { xs: "flex", sm: "none" }, justifyContent: "center", background: "#1f1f1f", padding: 2 }}>
          <InputBase
            placeholder="Search games..."
            onChange={(e) => setSearch(e.target.value)}
            sx={{ background: "#333", padding: "8px", borderRadius: 2, color: "white", width: "90%" }}
          />
        </Box>
      )}

      {/* Categories Navbar */}
      <Container sx={{ mt: 2, display: "flex", gap: 2, overflowX: "auto", pb: 2, justifyContent: "center", flexWrap: "wrap" }}>
        <Typography variant="h5" sx={{ color: "#ff9800", mr: 2, paddingTop: "10px" }}>Categories:</Typography>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          sx={{ backgroundColor: "#ff9800", borderRadius: 2, color: "black", px: 3, width: "200px" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Popular">Popular</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </Container>

      {/* Game Grid */}
      <Container sx={{ mt: 3, mb: 3 }}>
        {isLoading ? (
          <Typography variant="h6" color="gray" textAlign="center">Loading games...</Typography>
        ) : isError ? (
          <Typography variant="h6" color="red" textAlign="center">Failed to load games.</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {filteredGames.map((game) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={game._id}>
                <Card onClick={() => navigate(`/${game._id}`)} sx={{ background: "#1e1e1e", borderRadius: "10px", transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                  <CardMedia component="img" height="180" image={game.image} alt={game.name} sx={{ borderRadius: "10px 10px 0 0" }} />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", color: "#ff9800" }}>
                      {game.name}
                    </Typography>
                    <Typography variant="body2" color="gray" textAlign="center">
                      {game.accounts} Accounts Available
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default Home;
