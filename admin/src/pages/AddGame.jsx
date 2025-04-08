import React, { useState, useEffect } from "react";
import {
  Box, Button, TextField, Typography, Grid, Card, CardMedia,
  IconButton, MenuItem, CircularProgress
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { CloudUpload, Delete, AddCircle } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const gameCategories = [
  "Popular", "FPS", "MOBA", "Battle Royale", "RPG",
  "Adventure", "Strategy", "Simulation", "Sports", "Horror", "Indie"
];

const AddGame = () => {

  const queryClient = useQueryClient();


  const { id } = useParams(); // 'new' or game ID
  const navigate = useNavigate();
  const isEditMode = id !== "new";

  const [gameData, setGameData] = useState({
    name: "",
    image: "",
    category: "Popular",
    description: "",
    publisher: "",
    releaseDate: "",
    rating: "",
    cutyLinks: [""],
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🟡 Load data if editing
  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      axios.get(`https://steam-hub-backend.vercel.app/api/game/${id}`)
        .then((res) => {
          const game = res.data.game;
          setGameData({
            name: game.name,
            image: game.image, // keep as URL
            category: game.category,
            description: game.description,
            publisher: game.publisher,
            releaseDate: game.releaseDate.split("T")[0],
            rating: game.rating,
            cutyLinks: game.cutyLinks.length ? game.cutyLinks : [""],
          });
          setLoading(false);
        })
        .catch((err) => {
          alert("Error loading game details.");
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setGameData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setGameData((prev) => ({ ...prev, image: "" }));
  };

  const handleAddCutyLink = () => {
    setGameData((prev) => ({ ...prev, cutyLinks: [...prev.cutyLinks, ""] }));
  };

  const handleCutyLinkChange = (index, value) => {
    const updatedLinks = [...gameData.cutyLinks];
    updatedLinks[index] = value;
    setGameData((prev) => ({ ...prev, cutyLinks: updatedLinks }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gameData.name || !gameData.description || !gameData.publisher || !gameData.releaseDate || !gameData.rating) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", gameData.name);
    formData.append("description", gameData.description);
    formData.append("category", gameData.category);
    formData.append("publisher", gameData.publisher);
    formData.append("releaseDate", gameData.releaseDate);
    formData.append("rating", gameData.rating);
    formData.append("cutyLinks", JSON.stringify(gameData.cutyLinks));
    formData.append("accounts", gameData.cutyLinks.length);

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const url = isEditMode
        ? `https://steam-hub-backend.vercel.app/api/edit-game/${id}`
        : "https://steam-hub-backend.vercel.app/api/add-game";

      const method = isEditMode ? axios.put : axios.post;
      const response = await method(url, formData,{
        headers:{
          token:localStorage.getItem("token")
        }
      });

      if (response.data.status) {
        alert(response.data.message);
        if (!isEditMode) {
          // Reset only in add mode
          setGameData({
            name: "",
            image: "",
            category: "Popular",
            description: "",
            publisher: "",
            releaseDate: "",
            rating: "",
            cutyLinks: [""],
          });
          setImageFile(null);
          queryClient.invalidateQueries(["games"]);
          navigate("/games"); // Or wherever your game list is

        } else {
          navigate("/games"); // Or wherever your game list is
        }
      } else {
        alert(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error saving game.");
    }
  };


  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: "auto", background: "#f8f9fa", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center" }}>
        {isEditMode ? "Update Game" : "Add New Game"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Game Name" name="name" value={gameData.name} onChange={handleChange} required />
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                width: "100%", height: 200, display: "flex",
                justifyContent: "center", alignItems: "center",
                border: "1px dashed #ccc", position: "relative"
              }}
            >
              {gameData.image ? (
                <>
                  <CardMedia
                    component="img"
                    image={gameData.image}
                    alt="Game Preview"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{ position: "absolute", top: 8, right: 8, background: "white" }}
                  >
                    <Delete color="error" />
                  </IconButton>
                </>
              ) : (
                <Button component="label" startIcon={<CloudUpload />}>
                  Upload Image
                  <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </Button>
              )}
            </Card>
          </Grid>

          <Grid item xs={12}>
            <TextField select fullWidth label="Category" name="category" value={gameData.category} onChange={handleChange}>
              {gameCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Rating"
              name="rating"
              value={gameData.rating}
              onChange={handleChange}
              type="number"
              inputProps={{ min: 0, max: 10, step: 0.1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={gameData.description}
              onChange={handleChange}
              multiline rows={3}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Publisher" name="publisher" value={gameData.publisher} onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Release Date" name="releaseDate" type="date" InputLabelProps={{ shrink: true }} value={gameData.releaseDate} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ flexGrow: 1 }}>Cuty.io Links</Typography>
            <IconButton onClick={handleAddCutyLink} color="primary">
              <AddCircle />
            </IconButton>
          </Grid>

          {gameData.cutyLinks.map((link, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                fullWidth
                label={`Cuty.io Link ${index + 1}`}
                value={link}
                onChange={(e) => handleCutyLinkChange(index, e.target.value)}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {isEditMode ? "Update Game" : "Add Game"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddGame;
