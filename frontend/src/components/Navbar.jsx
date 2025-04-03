import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography, InputBase, Box, IconButton } from "@mui/material";
import { Search as SearchIcon, SportsEsports as GameIcon, HelpOutline as HelpIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div>
            <AppBar position="static" sx={{ background: "#1f1f1f" }}>
                <Toolbar>
                    <GameIcon onClick={() => navigate("/")} sx={{ mr: 2, fontSize: 30, color: "#ff9800" }} />
                    <Typography onClick={() => navigate("/")} variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "1.5rem", cursor: "pointer" }}>
                        Steam Hub
                    </Typography>

                    {/* Search Bar - Visible on larger screens */}
                    <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", background: "#333", padding: "6px 12px", borderRadius: 2 }}>
                        <SearchIcon sx={{ color: "#ff9800" }} />
                        <InputBase
                            placeholder="Search games..."
                            sx={{ marginLeft: 1, color: "white", width: "200px" }}
                        />
                    </Box>

                    {/* Mobile Icons */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => setShowSearch(!showSearch)} sx={{ display: { xs: "flex", sm: "none" }, color: "#ff9800" }}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton onClick={() => navigate("/how-to-use")} sx={{ display: { xs: "flex", sm: "none" }, color: "#ff9800" }}>
                            <HelpIcon />
                        </IconButton>
                    </Box>

                    {/* "How to Use" Button - Visible on larger screens */}
                    <Button onClick={() => navigate("/how-to-use")} startIcon={<HelpIcon />} sx={{ display: { xs: "none", sm: "flex" }, m:2, color: "#ff9800", textTransform: "none", fontSize: "1rem", mr: 2, background: "#333", borderRadius: 2, padding: "6px 12px", '&:hover': { background: "#444" } }}>
                        How to Use
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Search Input - Appears on mobile when search icon is clicked */}
            {showSearch && (
                <Box sx={{ display: "flex", alignItems: "center", background: "#333", padding: "6px 12px", borderRadius: 2, marginTop: 1, marginX: "auto", maxWidth: "90%" }}>
                    <SearchIcon sx={{ color: "#ff9800" }} />
                    <InputBase
                        placeholder="Search games..."
                        sx={{ marginLeft: 1, color: "white", flexGrow: 1 }}
                    />
                </Box>
            )}
        </div>
    );
};

export default Navbar;
