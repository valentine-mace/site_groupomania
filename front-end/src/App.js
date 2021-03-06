import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConnexionPage from "./pages/ConnexionPage";
import Home from "./pages/Home";
import InscriptionPage from "./pages/InscriptionPage";
import ProfilUser from "./pages/ProfilUser";
import Post from "./pages/Post";
import Posts from "./pages/Posts";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ConnexionPage/>}></Route>
      <Route path="/signup" element={<InscriptionPage/>}></Route>
      <Route path="/home/:id" element={<Home/>}></Route>
      <Route path="/home/:id/profil/:id" element={<ProfilUser/>}></Route>
      <Route path="/home/:id/post/:id" element={<Post/>}></Route>
      <Route path="/home/:id/post" element={<Posts/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
