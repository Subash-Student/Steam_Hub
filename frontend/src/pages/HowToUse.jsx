import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Button, useMediaQuery } from "@mui/material";
import { PlayArrow as PlayIcon } from "@mui/icons-material";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HowToUse = () => {
    const [activeTab, setActiveTab] = useState("guide");
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Navbar />
            <Box sx={{ background: "#121212", minHeight: "100vh", color: "white", padding: isMobile ? "10px" : "20px" }}>
                <Container maxWidth="md">
                    <Typography 
                        variant={isMobile ? "h4" : "h3"} 
                        sx={{ fontWeight: "bold", textAlign: "center", color: "#ff9800", mb: 3 }}
                    >
                        How to Use Steam Hub ?
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2, alignItems: "center" }}>
                        <Button 
                            onClick={() => setActiveTab("guide")} 
                            sx={{ 
                                color: activeTab === "guide" ? "white" : "#ff9800", 
                                textTransform: "none", 
                                fontSize: "1rem",
                                borderBottom: activeTab === "guide" ? "3px solid #ff9800" : "none"
                            }}
                        >
                            Get Steam Account
                        </Button>
                        <Button 
                            onClick={() => setActiveTab("installation")} 
                            sx={{ 
                                color: activeTab === "installation" ? "white" : "#ff9800", 
                                textTransform: "none", 
                                fontSize: "1rem",
                                borderBottom: activeTab === "installation" ? "3px solid #ff9800" : "none"
                            }}
                        >
                            Game Installation
                        </Button>
                    </Box>

                    <Card sx={{ background: "#252525", borderRadius: "10px", padding: "20px", boxShadow: "0px 0px 10px #ff9800" }}>
                        <CardContent>
                            <List>
                                {(activeTab === "guide" ? [
                                    "Search for your favorite game using the search bar.",
                                    "Browse games by category from the navigation bar.",
                                    "Click on a game to view its details and available accounts.",
                                    "Click 'Get Account Link' to access your free Steam account.",
                                    "Follow the tutorial video to handle ads and get the account details.",
                                    "Each game has multiple accounts, so try another if one does not work."
                                ] : [
                                    "Log in to the Steam account using the provided username and password.",
                                    "Navigate to 'Settings' and disable the 'Remote Play' feature.",
                                    "Proceed to download the desired game.",
                                    "Once the download is complete, launch the game and play until you reach the main menu.",
                                    "Exit the game, go to Steam, click on 'Steam' in the top-left corner, and select 'Go Offline' mode.",
                                    "Always launch the game in offline mode to continue playing without interruptions."
                                ]).map((text, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon><PlayIcon sx={{ color: "#ff9800" }} /></ListItemIcon>
                                        <ListItemText style={{ color: "white" }} primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>

                    <Card sx={{ background: "#252525", borderRadius: "10px", padding: "20px", marginTop: "20px", boxShadow: "0px 0px 10px #ff9800" }}>
                        <CardContent>
                            <Typography variant={isMobile ? "h6" : "h5"} sx={{ color: "#ff9800", mb: 2 }}>Tutorial Video</Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <iframe
                                    width="100%"
                                    height={isMobile ? "200" : "315"}
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    title="Tutorial Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default HowToUse;