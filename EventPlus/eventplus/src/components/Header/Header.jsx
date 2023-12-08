import React, { useState } from 'react';
import './Header.css';

// Importando Componentes necessários
import Container from '../Container/Container';
import Nav from "../Nav/Nav";
import PerfilUsuario from '../PerfilUsuaio/PerfilUsuario';

// Importando imagens
import menubar from "../../assets/images/menubar.png"


const Header = () => {

    const [exibeNavbar, setExibeNavbar] = useState(false); //Exibe ou esconde o menu

    return (
        <header className='headerpage'>
            <Container>
                <div className='header-flex'>
                    <img
                    src={menubar}
                    alt="Imagem menu de barras. Serve para exibir ou esconder o menu do smartphone" 
                    onClick={() => {setExibeNavbar(true)}} //Função para exibir ou ocultar o navbar
                    className='headerpage__menubar'
                    />

                    {/* Note que aqui nós usamos o desctructuring para criar duas propriedades
                    exibeNavbar e setExibeNavbar
                    O valor entre chaves são as variáveis da classe Header*/}
                    <Nav exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar}/>
                    {/* Basicamente estamos falando que as nossas variáveis terão o mesmo valor na classe Nav */}
                    <PerfilUsuario/>
                </div>
            </Container>
        </header>
    );
};

export default Header;