import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConnexionPage from "./pages/ConnexionPage";
import Home from "./pages/Home";
import InscriptionPage from "./pages/InscriptionPage";
import ProfilUser from "./pages/ProfilUser";
import Post from "./pages/Post";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ConnexionPage/>}></Route>
      <Route path="/signup" element={<InscriptionPage/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/profil/:id" element={<ProfilUser/>}></Route>
      <Route path="/post/:id" element={<Post/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
