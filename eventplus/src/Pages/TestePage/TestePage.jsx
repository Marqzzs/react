import React, { useEffect, useState } from 'react';
import './Teste.css'
// import Input from '../../Components/Input/Input';
// import Button from '../../Components/Button/Button';
// import Title from '../../Components/Title/Title';

const Teste = () => {
    const [count, setCount] = useState(1);
    const [calculation, setCalculation] = useState(0);

    useEffect(() => {
        setCalculation( count * 2)
    }, [count])
    
    return (
        <>
          <p>Count: {count}</p>
          <button onClick={() => setCount((c) => c + 1)}>+</button>
          <p>Calculation: {calculation}</p>  
        </>
    );
};

export default Teste;