import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importacao das paginas
import HomePage from './Pages/HomePage/Home';
import LoginPage from './Pages/Loginpage/Login';

const Rotas = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<HomePage />} path={"/"} exact /> 
                    <Route element={<LoginPage />} path={"/login"} /> 
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Rotas;