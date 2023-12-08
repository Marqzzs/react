import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'
// Esse recurso serve para o site não recarregar toda vez que mudarmos de página

const Header = () => {
    return (
        <header>
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/eventos"}>Eventos</Link>
                <Link to={"/tipoEventos"}>Tipo Eventos</Link>
                <Link to={"/testePage"}>Teste</Link> 
            </nav>
        </header>
    );
};

export default Header;