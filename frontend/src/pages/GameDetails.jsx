import React from "react";
import { useParams, Link } from "react-router-dom";
import { AppBar,TextField , Toolbar, Typography, Button, Container, Box, Card, CardMedia, CardContent, Grid, IconButton, Divider } from "@mui/material";
import { ArrowBack as ArrowBackIcon, SportsEsports as GameIcon, ContentCopy as CopyIcon } from "@mui/icons-material";
import Navbar from "../components/Navbar";

const games = [
  { id: 1, name: "Counter-Strike 2", image: "https://csmarket.gg/blog/wp-content/uploads/2024/02/0cc382629edec933916a6f9912bd0f24-_1_-1024x576.webp", accounts: 5, description: "A tactical shooter game where players engage in strategic battles against opponents.", category: "FPS", publisher: "Valve", releaseDate: "2023", platforms: ["Windows"], rating: "4.5/5" },
  { id: 2, name: "Dota 2", image: "https://via.placeholder.com/400x200", accounts: 8, description: "A competitive MOBA game with strategic team-based gameplay.", category: "MOBA", publisher: "Valve", releaseDate: "2013", platforms: ["Windows", "Mac", "Linux"], rating: "4.7/5" },
  { id: 3, name: "PUBG", image: "https://via.placeholder.com/400x200", accounts: 10, description: "A thrilling battle royale experience where players fight for survival.", category: "Battle Royale", publisher: "Krafton", releaseDate: "2017", platforms: ["Windows", "Console"], rating: "4.3/5" },
  { id: 4, name: "GTA V", image: "https://via.placeholder.com/400x200", accounts: 3, description: "An open-world action-adventure game with an engaging story.", category: "Adventure", publisher: "Rockstar Games", releaseDate: "2013", platforms: ["Windows", "Console"], rating: "4.8/5" },
];

const GameDetails = () => {
  const { id } = useParams();
  const game = games.find((g) => g.id === parseInt(id));
  
  if (!game) {
    return <Typography variant="h4" textAlign="center">Game not found!</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#1a1a1a", minHeight: "100vh", color: "white", paddingBottom: "20px" }}>
     
     <Navbar />

      <Container sx={{ mt: 4 }}>
        <Card sx={{ background: "#252525", borderRadius: "12px", padding: "25px", display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", boxShadow: "0px 4px 10px rgba(255, 152, 0, 0.2)" }}>
          <CardMedia component="img" image={game.image} alt={game.name} sx={{ width: { xs: "100%", md: "45%" }, borderRadius: "12px", objectFit: "cover", boxShadow: "0px 4px 10px rgba(255, 152, 0, 0.3)" }} />
          <CardContent sx={{ flex: 1, ml: { md: 4 }, textAlign: "left" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#ff9800", mb: 1 }}>{game.name}</Typography>
            <Typography variant="subtitle1" color="gray">Category: {game.category}</Typography>
            <Divider sx={{ my: 2, backgroundColor: "gray" }} />
            <Typography variant="body1" sx={{ mb: 2, color: "white", lineHeight: 1.6 }}>{game.description}</Typography>
            <Typography variant="body2" color="gray">Publisher: {game.publisher} | Release Date: {game.releaseDate}</Typography>
            <Typography variant="body2" color="gray">Platforms: {game.platforms.join(", ")}</Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", mt: 3, gap: 2 }}>
              <Typography variant="h6" sx={{ color: "#ff9800", backgroundColor: "#333", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold" }}>Rating: {game.rating}</Typography>
              <Typography variant="h6" sx={{ color: "#ff9800", backgroundColor: "#333", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold" }}>{game.accounts} Accounts Available</Typography>
            </Box>
            
            <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 1 }}>
              <Button variant="contained" sx={{ backgroundColor: "#ff9800", color: "black", fontWeight: "bold", textTransform: "none", padding: "12px 24px", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(255, 152, 0, 0.3)", transition: "0.3s", "&:hover": { backgroundColor: "#e68900" }}}>Get Account Link</Button>
              <IconButton sx={{ color: "white", backgroundColor: "#333", padding: "8px", borderRadius: "8px", transition: "0.3s", "&:hover": { backgroundColor: "#444" } }}>
                <CopyIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Similar Games</Typography>
        <Grid container spacing={2} justifyContent="center">
          {games.filter(g => g.category === game.category && g.id !== game.id).length > 0 ? (
            games.filter(g => g.category === game.category && g.id !== game.id).map(similarGame => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={similarGame.id}>
                <Card sx={{ background: "#252525", borderRadius: "10px", transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                  <CardMedia component="img" height="150" image={similarGame.image} alt={similarGame.name} sx={{ objectFit: "cover", borderRadius: "10px 10px 0 0" }} />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff9800" }}>{similarGame.name}</Typography>
                    <Typography variant="body2" color="gray">{similarGame.category} | Rating: {similarGame.rating}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" textAlign="center" sx={{ color: "gray" }}>No similar games found.</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default GameDetails;