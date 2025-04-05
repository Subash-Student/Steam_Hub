import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider, Tooltip } from "@mui/material";
import { Home, Gamepad, AddBox, Edit, Logout, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
   
    const navigate = useNavigate()
    const toggleSidebar = () => {
        setOpen(!open);
    };

    const menuItems = [
        { text: "Dashboard", icon: <Home />, path: "/" },
        { text: "Games List", icon: <Gamepad />, path: "/games" },
        { text: "Add Game", icon: <AddBox />, path: "/add-game/new" },
        { text: "Manage Games", icon: <Edit />, path: "/manage-games" }
    ];

    return (
        <Drawer 
            variant="permanent" 
            open={open} 
            sx={{
                width: open ? 240 : 80,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: open ? 240 : 80,
                    background: "#ffffff", // Changed to white
                    color: "black", // Changed to black
                    transition: "width 0.3s",
                    overflowX: "hidden"
                }
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: open ? "space-between" : "center", p: 2 }}>
                {open && <ListItemText primary="Admin Panel" sx={{ fontWeight: "bold", fontSize: 18 }} />}
                <IconButton onClick={toggleSidebar} sx={{ color: "black" }}> {/* Changed to black */}
                    <Menu />
                </IconButton>
            </Box>
            <Divider sx={{ background: "#bbb" }} /> {/* Adjusted divider color */}
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: "block" }}>
                        <Tooltip title={!open ? item.text : ""} placement="right">
                            <ListItemButton onClick={()=>navigate(item.path)} sx={{ px: 2.5, py: 1, minHeight: 50, justifyContent: open ? "initial" : "center" }}>
                                <ListItemIcon sx={{ color: "black", minWidth: 0, mr: open ? 2 : "auto" }}>{item.icon}</ListItemIcon> {/* Changed to black */}
                                {open && <ListItemText primary={item.text} />}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
                <Divider sx={{ background: "#bbb" }} /> {/* Adjusted divider color */}
                <ListItem disablePadding>
                    <Tooltip title={!open ? "Logout" : ""} placement="right">
                        <ListItemButton sx={{ px: 2.5, py: 1, minHeight: 50, justifyContent: open ? "initial" : "center" }}>
                            <ListItemIcon sx={{ color: "black", minWidth: 0, mr: open ? 2 : "auto" }}> {/* Changed to black */}
                                <Logout />
                            </ListItemIcon>
                            {open && <ListItemText primary="Logout" />}
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
            </Box>
        </Drawer>
    );
};

export default Sidebar;