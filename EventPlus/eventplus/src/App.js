import { useEffect, useState } from 'react';
import './App.css';
import Rotas from '../src/routes/routes'
// Importando o userContext
import { UserContext } from './context/AuthContext';

// Importa nosso app encapsulado pelo sistema de roteamento

const App = () => {

    const [userData, setUserData] = useState({});

    useEffect(() => {

        const storageValue = JSON.parse(localStorage.getItem("token"))

        if (storageValue !== null) {
            setUserData(storageValue)
        }
    }, [])

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <Rotas />
        </UserContext.Provider>
    );
};

export default App;
