import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route,useNavigate } from "react-router-dom";
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import HowToUse from './pages/HowToUse';



function App() {
  
 
  return (

    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/:id" element={<GameDetails />} />
      </Routes>
    </div>
  );
}

export default App;