import React from 'react';
import './Footer.css'
// import Container from '../Container/Container'

const Footer = ({textRigths = "Escola Senai de Informatica - 2023"}) => {
    return (
        <footer className='footer-page'>
          <p className='footer-page__rights'>
            {textRigths}
          </p>  
        </footer>
    );
};

export default Footer;