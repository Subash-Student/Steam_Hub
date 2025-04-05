// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import DashBoard from "./pages/DashBoard";
import Sidebar from "./components/Sidebar";
import GameList from "./pages/GameList";
import ManageGames from "./pages/ManageGames";
import AddGame from "./pages/AddGame";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute ";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {token && <Sidebar />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games"
              element={
                <ProtectedRoute>
                  <GameList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-games"
              element={
                <ProtectedRoute>
                  <ManageGames />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-game/:id"
              element={
                <ProtectedRoute>
                  <AddGame />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;
