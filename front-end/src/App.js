import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConnexionPage from "./pages/ConnexionPage";
import Home from "./pages/Home";
import InscriptionPage from "./pages/InscriptionPage";
import ProfilUser from "./pages/ProfilUser";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<ConnexionPage/>}></Route>
      <Route path="/signup" element={<InscriptionPage/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/profil" element={<ProfilUser/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
