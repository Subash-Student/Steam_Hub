import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid, Card, CardMedia, IconButton } from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

const AddGame = () => {
  const [gameData, setGameData] = useState({
    name: "",
    image: "",
    category: "",
    description: "",
    publisher: "",
    releaseDate: "",
    rating: "",
    cutyLink: "",
  });

  const handleChange = (e) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setGameData({ ...gameData, image: imageUrl });
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: "auto", background: "#f8f9fa", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center" }}>
        Add New Game
      </Typography>

      <Grid container spacing={2}>
        {/* Game Name */}
        <Grid item xs={12}>
          <TextField fullWidth label="Game Name" name="name" value={gameData.name} onChange={handleChange} />
        </Grid>

        {/* Image Upload */}
        <Grid item xs={12}>
          <Card sx={{ width: "100%", height: 200, display: "flex", justifyContent: "center", alignItems: "center", border: "1px dashed #ccc" }}>
            {gameData.image ? (
              <CardMedia component="img" image={gameData.image} alt="Game Preview" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Button component="label" startIcon={<CloudUpload />}>
                Upload Image
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
            )}
          </Card>
          {gameData.image && (
            <IconButton onClick={() => setGameData({ ...gameData, image: "" })} sx={{ position: "absolute", marginTop: -4, marginLeft: -4 }}>
              <Delete color="error" />
            </IconButton>
          )}
        </Grid>

        {/* Category & Rating */}
        <Grid item xs={12}>
          <TextField fullWidth label="Category" name="category" value={gameData.category} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Rating" name="rating" value={gameData.rating} onChange={handleChange} type="number" />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField fullWidth label="Description" name="description" value={gameData.description} onChange={handleChange} multiline rows={3} />
        </Grid>

        {/* Publisher & Release Date */}
        <Grid item xs={6}>
          <TextField fullWidth label="Publisher" name="publisher" value={gameData.publisher} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Release Date" name="releaseDate" value={gameData.releaseDate} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} />
        </Grid>

        {/* Cuty.io Link */}
        <Grid item xs={12}>
          <TextField fullWidth label="Cuty.io Link" name="cutyLink" value={gameData.cutyLink} onChange={handleChange} />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary">
            Add Game
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddGame;
