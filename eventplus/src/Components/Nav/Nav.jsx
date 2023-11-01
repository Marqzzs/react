import React from "react";
import "./Nav.css";
import logoMobile from "../../assets/images/logo-white.svg";
import logoDesktop from "../../assets/images/logo-pink.svg";

const Nav = () => {
  return (
    <nav className="navbar">
      <span className="navbar__close">x</span>

      <a href="" className="eventlogo">
        <img className="eventlogo__logo-image" src={logMobile} alt="" />
      </a>

      <div className="navbar__itens-box">
        <a href="">Home</a>
        <a href="">Tipos Eventos</a>
        <a href="">Usuarios</a>
      </div>
    </nav>
  );
};

export default Nav;
