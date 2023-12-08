import React, { useContext } from 'react';
import "./Nav.css"

// Importando logotipo das navs
import logoMobile from "../../assets/images/logo-white.svg";
import logoDesktop from '../../assets/images/logo-pink.svg';


import { Link } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';
//Relembre que esses parâmetros estão
//sendo criados no Header 
const Nav = ({ exibeNavbar, setExibeNavbar }) => {

    const { userData, setUseData } = useContext(UserContext)


    return (
        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
            <span
                className='navbar__close'
                onClick={() => { setExibeNavbar(false) }}
            >
                x
            </span>




            <Link to="/" className='eventLogo'>
                <img
                    className='eventlogo__logo-image'
                    src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
                    alt="Event Plus Logo"
                    onClick={() => { setExibeNavbar(false) }}
                />
            </Link>




            <div className="navbar__items-box">

                <Link
                    onClick={() => { setExibeNavbar(false) }}
                    className='navbar__item'
                    to={"/"}
                >Home</Link>
                {userData.name && userData.role === "Administrador" ? (
                    <>
                        <Link
                            onClick={() => { setExibeNavbar(false) }}
                            className='navbar__item'
                            to={"/tipoEventos"}
                        >Tipos de Evento</Link>
                        <Link
                            onClick={() => { setExibeNavbar(false) }}
                            className='navbar__item'
                            to={"/eventos"}
                        >Eventos</Link>
                        <Link
                            onClick={() => { setExibeNavbar(false) }}
                            className='navbar__item'
                            to={"/instituicao"}
                        >Instituição</Link>
                    </>

                ) : (
                    userData.name && userData.role === "Aluno" ? (
                        <>
                            <Link
                                onClick={() => { setExibeNavbar(false) }}
                                className='navbar__item'
                                to="/eventos-aluno"
                            >Eventos Aluno</Link>
                        </>
                    ) : (null)
                )}
            </div>
        </nav>
    );
};

export default Nav;