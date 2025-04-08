import React, { useState } from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Tooltip, TextField, Select, MenuItem, InputLabel, FormControl, CircularProgress
} from "@mui/material";
import { ArrowUpward, ArrowDownward, Search } from "@mui/icons-material";
import { useTheme, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ['games'],
    queryFn: fetchGames
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">Failed to load games.</Typography>
      </Box>
    );
  }

  const games = data || [];

  const sortedGames = [...games]
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || game.category === categoryFilter)
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#ffffff", minHeight: "100vh", color: "black" }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center", color: "#000000" }}>
        Game List
      </Typography>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
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

      <TableContainer
        component={Paper}
        sx={{
          background: "#eaeaea",
          borderRadius: "10px",
          border: "0.5px solid #d9d9d9",
          overflowX: 'auto'
        }}
      >
        <Table sx={{ minWidth: isMobile ? 600 : 'auto' }}>
          <TableHead>
            <TableRow>
              {["id", "image", "name", "category", "accounts", "added"].map((label, index) => (
                <TableCell
                  key={index}
                  sx={{
                    color: "#000000",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: isMobile ? '0.75rem' : '0.875rem'
                  }}
                  onClick={() => handleSort(label)}
                >
                  {label.charAt(0).toUpperCase() + label.slice(1)}
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
                    <img
                      src={game.image}
                      alt={game.name}
                      width={isMobile ? 40 : 50}
                      height={isMobile ? 40 : 50}
                      style={{ borderRadius: "5px" }}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>{game.name}</TableCell>
                <TableCell>{game.category}</TableCell>
                <TableCell>{game.cutyLinks.length}</TableCell>
                
                <TableCell>{game.added.split("T")[0]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GameList;
