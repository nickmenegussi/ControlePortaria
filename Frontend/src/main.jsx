import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />

        <Route path="/Home" element={<Home />} />
        {/* <Route path="/Apartamentos" element={<Apartamentos />} />
        <Route path="/Perfis" element={<Perfis />} />
        <Route path="/Cadastro-Apartamento" element={<Home />} />
        <Route path="/Cadastro-Perfil" element={<Home />} />
        <Route path="/Cadastro-Carro" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
