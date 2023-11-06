import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//importacao das paginas
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/Loginpage/LoginPage";
import TiposEventoPage from "./Pages/TiposEvento/TiposEventoPage";
import EventosPage from "./Pages/EventosPage/EventosPage";
import TestePage from "./Pages/TestePage/TestePage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const Rotas = () => {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<HomePage />} path={"/"} exact />
          <Route element={<LoginPage />} path={"/login"} />
          <Route element={<TiposEventoPage />} path={"/tipos-eventos"} />
          <Route element={<EventosPage />} path={"/eventos"} />
          <Route element={<TestePage />} path={"/testes"} />
        </Routes>
        <Footer />
      </BrowserRouter>

  );
};

export default Rotas;
