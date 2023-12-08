import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom" //Rota V6 já atualizada é preciso chamar essas três propriedades para criar um programa

// Importando as páginas
import HomePage from "../Pages/HomePage/HomePage"
import EventosPage from "../Pages/EventosPage/EventosPage"
import TipoEventosPage from "../Pages/TipoEventosPage/TipoEventosPage"
import TestePage from "../Pages/TestePage/TestePage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LoginPage from "../Pages/LoginPage/LoginPage";
import InstituicaoPage from "../Pages/InstituicaoPage/InstituicaoPage";
import { PrivateRoute } from "./PrivateRoute";
import EventoAlunoPage from "../Pages/EventoAlunoPage/EventoAlunoPage";


// Sempre nessa ordem as rotas retornam um BrowserRouter > Routes > Route
const Rotas = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    {/* Relembrando que as routes são as páginas que vamos direcionar o usuario */}
                    {/* element= "A página que importamos acima" */}
                    {/* path= "O texto que será mostrado na url" */}
                    <Route element={<HomePage />} path="/" exact />

                    <Route
                        path="/tipoEventos"
                        element={
                            // Relembrando que essa private route serve como uma condicional para a página
                            // Se estamos logados a página aparece, senão a página home aparece
                            <PrivateRoute redirectTo="/loginPage">
                                <TipoEventosPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/eventos"
                        element={
                            <PrivateRoute redirectTo="/loginPages">
                                <EventosPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/instituicao"
                        element={
                            <PrivateRoute redirectTo="/">
                                <InstituicaoPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/eventos-aluno"
                        element={
                            <PrivateRoute redirectTo="/">
                                <EventoAlunoPage/>
                            </PrivateRoute>
                        }
                    />

                    <Route element={<LoginPage />} path="/loginPage" />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default Rotas