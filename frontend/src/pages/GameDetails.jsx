import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "../components/Navbar";

// Fetch single game by ID
const fetchGameById = async (id) => {
  
  try {
    const res = await axios.get(`https://steam-hub-backend.vercel.app/api/game/${id}`);
    return res.data.game;
  } catch (error) {
    console.error(`Error fetching game with ID ${id}:`, error);
    throw error;
  }
};

const GameDetails = () => {
  const { id } = useParams();

  const { data: game, isLoading, error } = useQuery({
    queryKey: ["game", id],
    queryFn: () => fetchGameById(id),
    enabled: !!id,
  });

  const [selectedLink, setSelectedLink] = useState("");

  useEffect(() => {
    if (game && game.cutyLinks && game.cutyLinks.length > 0) {
      setSelectedLink(game.cutyLinks[0]);
    }
  }, [game]);

  if (isLoading) {
    return <Typography variant="h5" textAlign="center" mt={5}>Loading game details...</Typography>;
  }

  if (error || !game) {
    return <Typography variant="h4" textAlign="center" mt={5}>Game not found!</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#1a1a1a", minHeight: "100vh", color: "white", paddingBottom: "20px" }}>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Card
          sx={{
            background: "#252525",
            borderRadius: "12px",
            padding: "25px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            boxShadow: "0px 4px 10px rgba(255, 152, 0, 0.2)",
          }}
        >
          <CardMedia
            component="img"
            image={game.image}
            alt={game.name}
            sx={{
              width: { xs: "100%", md: "45%" },
              borderRadius: "12px",
              objectFit: "cover",
              boxShadow: "0px 4px 10px rgba(255, 152, 0, 0.3)",
            }}
          />
          <CardContent sx={{ flex: 1, ml: { md: 4 }, textAlign: "left" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#ff9800", mb: 1 }}>
              {game.name}
            </Typography>
            <Typography variant="subtitle1" color="gray">Category: {game.category}</Typography>
            <Divider sx={{ my: 2, backgroundColor: "gray" }} />
            <Typography variant="body1" sx={{ mb: 2, color: "white", lineHeight: 1.6 }}>
              {game.description}
            </Typography>
            <Typography variant="body2" color="gray">
              Publisher: {game.publisher} | Release Date: {game.releaseDate.split("T")[0]}
            </Typography>
            

            <Box sx={{ display: "flex", alignItems: "center", mt: 3, gap: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#ff9800",
                  backgroundColor: "#333",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                Rating: {game.rating} / 5
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#ff9800",
                  backgroundColor: "#333",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                {game.cutyLinks.length} Accounts Available
              </Typography>
            </Box>

            <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                href={selectedLink}
                target="_blank"
                sx={{
                  backgroundColor: "#ff9800",
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(255, 152, 0, 0.3)",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#e68900",
                  },
                }}
              >
                {`Get Link ${game.cutyLinks.indexOf(selectedLink) + 1}`}
              </Button>

              <FormControl
                sx={{
                  minWidth: 150,
                  backgroundColor: "#333",
                  borderRadius: "8px",
                  color: "white",
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                  "& .MuiInputLabel-root": { color: "gray" },
                  "& .MuiSelect-select": { padding: "10px", color: "white" },
                }}
              >
                <InputLabel sx={{ color: "gray" }}>Select Link</InputLabel>
                <Select value={selectedLink} onChange={(e) => setSelectedLink(e.target.value)} label="Select Link">
                  {game.cutyLinks.map((link, index) => (
                    <MenuItem key={index} value={link}>
                      {`Link ${index + 1}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default GameDetails;
