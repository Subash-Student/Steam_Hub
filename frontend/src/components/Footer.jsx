import React from 'react';
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Instagram, SportsEsports as GameIcon } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box sx={{ background: "#1f1f1f", color: "white", padding: "40px 20px", mt: 0, paddingTop: "20px" }}>
            <Box sx={{ maxWidth: "1200px", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", flexDirection: { xs: "column", sm: "row" } }}>
                
                {/* Navigation */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, textAlign: { xs: "center", sm: "left" } }}>
                    <Link fontFamily={"sans-serif"} href="/" color="grey" underline="none" sx={{ fontSize: "14px", '&:hover': { color: "#ff9800" } }}>Home</Link>
                    <Link fontFamily={"sans-serif"} href="/categories" color="grey" underline="none" sx={{ fontSize: "14px", '&:hover': { color: "#ff9800" } }}>Categories</Link>
                    <Link fontFamily={"sans-serif"} href="/how-to-use" color="grey" underline="none" sx={{ fontSize: "14px", '&:hover': { color: "#ff9800" } }}>How to Use</Link>
                    <Link fontFamily={"sans-serif"} href="/contact" color="grey" underline="none" sx={{ fontSize: "14px", '&:hover': { color: "#ff9800" } }}>Contact Us</Link>
                </Box>

                {/* Branding & Social Media */}
                <Box sx={{ textAlign: { xs: "center", sm: "right" }, mt: { xs: 2, sm: 0 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-end" } }}>
                        <GameIcon sx={{ color: "#ff9800", fontSize: 30, mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>Steam Hub</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1, color: "gray", fontSize: "14px" }}>
                        Your Gateway to Free Steam Accounts!
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" }, gap: 1, mt: 1 }}>
                        <IconButton sx={{ color: "#ff9800" }}><Instagram /></IconButton>
                    </Box>
                </Box>
            </Box>
            {/* Disclaimer */}
            <Box sx={{ textAlign: "center", mt: 2, padding: "10px", background: "#252525" }}>
                <Typography variant="body2" color="gray" sx={{ fontSize: "12px" }}>Disclaimer: I do not own these accounts, they are publicly available Steam accounts collected from online sources. I am not responsible for any issues related to account security, theft, or misuse.</Typography>
            </Box>
        </Box>
    );
};

export default Footer;
