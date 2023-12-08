import React, { useState } from 'react';

const Input = ({onChange, type, placeholder, name, id, value}) => {

    const [numero1, setNumero1] = useState();//Dado do componente

    return (
        <>
        {/* Um exemplo de input destructuring abaixo */}
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                
            />
            <br />
        </>
    );
};

export default Input;