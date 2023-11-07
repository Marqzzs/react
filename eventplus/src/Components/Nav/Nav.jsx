import React from "react";
import "./Nav.css";
import logoMobile from "../../assets/images/logo-white.svg";
import logoDesktop from "../../assets/images/logo-pink.svg";
import { Link } from "react-router-dom";

const Nav = ({exibeNavbar, setExibeNavbar}) => {

  console.log(`Exibe o menu? ${exibeNavbar}`);
  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`} >
      <span 
      onClick={() => {setExibeNavbar(false)}} 
      className="navbar__close">
        x
      </span>

      <Link to="/" className="eventlogo">
        <img className="eventlogo__logo-image" 
        src={window.innerWidth >= 992 ? logoDesktop : logoMobile} 
        alt="Event plus logo"/>
      </Link>

      <div className="navbar__items-box">
        <Link to="/" className="navbar__item">Home</Link>
        <Link to="/tipos-eventos" className="navbar__item">Tipos Eventos</Link>
        <Link to="/eventos" className="navbar__item">Eventos</Link>
        <Link to="/login" className="navbar__item">Login</Link>
        <Link to="/testes" className="navbar__item">Testes</Link>
      </div>
    </nav>
  );
};

export default Nav;
