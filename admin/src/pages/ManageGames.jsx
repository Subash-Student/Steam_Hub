import React, { useState } from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Tooltip, TextField, Select, MenuItem,
  InputLabel, FormControl, Menu
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import {  Search, MoreVert } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom"
const fetchGames = async () => {
  try {
    const { data } = await axios.get("https://steam-hub-backend.vercel.app/api/all-games"); 
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

const gameCategories = [
  "Popular", "FPS", "MOBA", "Battle Royale", "RPG",
  "Adventure", "Strategy", "Simulation", "Sports", "Horror", "Indie"
];

const GameList = () => {

  const queryClient = useQueryClient();

  const navigate = useNavigate()

  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const { data: games = [], isLoading, isError } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  const handleMenuOpen = (event, game) => {
    setMenuAnchor(event.currentTarget);
    setSelectedGame(game);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedGame(null);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedGames = games
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || game.category === categoryFilter)
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  if (isLoading) return <Typography sx={{ textAlign: "center", mt: 4 }}>Loading...</Typography>;
  if (isError) return <Typography sx={{ textAlign: "center", mt: 4, color: "red" }}>Failed to fetch games</Typography>;


 

  const handleDelete = async (id) => {
    
    const confirm = window.confirm("Are you sure you want to delete this game?");
    if (!confirm) return;
  
    try {
      await axios.delete(`https://steam-hub-backend.vercel.app/api/delete-game/${id}`,{
        headers:{
          token:localStorage.getItem("token")
        }
      });
      alert("Game deleted successfully");
     
      queryClient.invalidateQueries(["games"])
  
    } catch (error) {
      console.error("Error deleting game:", error);
      alert("Failed to delete the game");
    } finally {
      handleMenuClose();
    }
  };
  


  return (
    <Box sx={{ padding: 3, minHeight: "100vh", backgroundColor: "#ffffff", color: "black" }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        Manage Games
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search Games..."
          fullWidth
          InputProps={{ startAdornment: <Search sx={{ color: "#000000" }} /> }}
          sx={{ background: "#eaeaea", borderRadius: "5px", input: { color: "black" } }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl sx={{ minWidth: 150, background: "#eaeaea", borderRadius: "5px" }}>
          <InputLabel sx={{ color: "#000000" }}>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ color: "black" }}
          >
            <MenuItem value="">All</MenuItem>
            {gameCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ background: "#eaeaea", borderRadius: "10px", border: "0.5px solid #d9d9d9" }}>
        <Table>
          <TableHead>
            <TableRow>
              {["No", "Image", "Name", "Category", "Accounts","Added Date", "Actions"].map((label, index) => (
                <TableCell key={index} sx={{ color: "#000000", fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => handleSort(label.toLowerCase().replace(" ", ""))}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedGames.map((game) => (
              <TableRow key={game._id} sx={{ '&:hover': { backgroundColor: "#ddd" } }}>
                <TableCell>{game.id}</TableCell>
                <TableCell>
                  <Tooltip title={<img src={game.image} alt={game.name} style={{ width: 150 }} />}>
                    <img src={game.image} alt={game.name} width={50} height={50} style={{ borderRadius: "5px" }} />
                  </Tooltip>
                </TableCell>
                <TableCell>{game.name}</TableCell>
                <TableCell>{game.category}</TableCell>
                <TableCell>{game.cutyLinks.length}</TableCell>
                
                <TableCell>{game.added.split("T")[0]}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, game)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                  <MenuItem onClick={()=>navigate(`/add-game/${game._id}`)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleDelete(game._id)}>Delete</MenuItem>
                </Menu>
              </TableRow>
              
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>

      
    </Box>
  );
};

export default GameList;
