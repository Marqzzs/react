import React from 'react';
import "./Container.css"

const Container = ({children}) => {
    return (
        <div className='container'>
            {/* Nós chamamos essa children para podermos usar esse componente em várias divs e criar um front end mais responsivo*/}
            {children}
        </div>
    );
};

export default Container;