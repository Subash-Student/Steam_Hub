import React, { useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Tooltip, TextField, Select, MenuItem, InputLabel, FormControl, Menu } from "@mui/material";
import { ArrowUpward, ArrowDownward, Search, MoreVert } from "@mui/icons-material";
import { useTheme, useMediaQuery } from '@mui/material';


const games = [
  { id: 1, image: "game1.jpg", name: "Cyberpunk 2077", category: "RPG", accounts: 5, clicks: 120, trend: "up", added: "2024-04-01" },
  { id: 2, image: "game2.jpg", name: "Elden Ring", category: "Action", accounts: 3, clicks: 90, trend: "down", added: "2024-03-28" },
  { id: 3, image: "game3.jpg", name: "GTA V", category: "Open World", accounts: 8, clicks: 200, trend: "up", added: "2024-03-20" },
];

const ManageGames = () => {

    // Inside your component:
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleMenuOpen = (event, game) => {
    setMenuAnchor(event.currentTarget);
    setSelectedGame(game);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedGame(null);
  };

  const sortedGames = [...games]
    .filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()) && (categoryFilter === "" || game.category === categoryFilter))
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
    <Box sx={{ padding: 3, margin: 0, backgroundColor: "#ffffff", minHeight: "100vh", color: "black" }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center", color: "#000000" }}>
        Manage Games
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
          <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} sx={{ color: "black" }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="RPG">RPG</MenuItem>
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Open World">Open World</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer 
  component={Paper} 
  sx={{ 
    background: "#eaeaea", 
    borderRadius: "10px", 
    border: "0.5px solid #d9d9d9",
    overflowX: 'auto' // Allows horizontal scrolling on small screens
  }}
>
  <Table sx={{ minWidth: isMobile ? 600 : 'auto' }}> {/* Force minimum width on mobile */}
    <TableHead>
      <TableRow>
        {["No", "Image", "Name", "Category", "Accounts", "Clicks", "Added Date"].map((label, index) => (
          <TableCell 
            key={index} 
            sx={{ 
              color: "#000000", 
              fontWeight: "bold", 
              cursor: "pointer",
              fontSize: isMobile ? '0.75rem' : '0.875rem' // Smaller font on mobile
            }} 
            onClick={() => handleSort(label.toLowerCase())}
          >
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {sortedGames.map((game) => (
        <TableRow key={game.id} sx={{ '&:hover': { backgroundColor: "#ddd" } }}>
          <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{game.id}</TableCell>
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
          <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{game.name}</TableCell>
          <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{game.category}</TableCell>
          <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{game.accounts}</TableCell>
          <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
            {game.clicks} {game.trend === "up" ? 
              <ArrowUpward sx={{ color: "#4caf50", fontSize: isMobile ? '1rem' : '1.25rem' }} /> : 
              <ArrowDownward sx={{ color: "#f44336", fontSize: isMobile ? '1rem' : '1.25rem' }} />}
          </TableCell>
          <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{game.added}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={() => alert(`Edit ${selectedGame?.name}`)}>Edit</MenuItem>
        <MenuItem onClick={() => alert(`Delete ${selectedGame?.name}`)}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default ManageGames;