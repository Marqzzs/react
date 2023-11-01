import React from "react";
import "./Header.css";
import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";
import menubar from "../../assets/images/menubar.png";

const Header = () => {
  return (
    <header className="headerPage">
      <Container>
        <div className="header-flex">
          <img
            src={menubar}
            alt="imagem de menu de barras, utilizada para exibir ou esconder o menu no smartphone"
          />
          <Nav />
          <PerfilUsuario />
        </div>
      </Container>
    </header>
  );
};

export default Header;
