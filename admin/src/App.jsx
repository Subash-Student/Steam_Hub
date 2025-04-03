import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import DashBoard from "./pages/DashBoard";
import Sidebar from "./components/Sidebar";
import GameList from "./pages/GameList";
import ManageGames from "./pages/ManageGames";
import AddGame from "./pages/AddGame";


function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/manage-games" element={<ManageGames />} />
            <Route path="/add-game" element={<AddGame />} />
            {/* <Route path="/games/edit/:id" element={<EditGame />} /> */}
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;
