import React, { useContext } from "react";
import "./PerfilUsuario.css";

// Importando imagens
import iconeLogout from "../../assets/images/icone-logout.svg";
import { UserContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const PerfilUsuario = () => {

    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();


    const logout = () => {
        localStorage.clear();
        setUserData({});
        navigate("/loginPage")
    }


    return (
        <div className="perfil-usuario">

            {userData.name ? (
                <>
                    <span className="perfil-usuario__menuitem">{userData.name}</span>

                    <img
                        title="Deslogar"
                        className="perfil-usuario__icon"
                        src={iconeLogout}
                        onClick={logout}
                        alt="imagem ilustrativa de uma porta de saída do usuário "
                    />

                </>
            ) : (
                <>
                <Link to={"/loginPage"} className="perfil-usuario__menuitem">Login</Link>
                </>
            )}

            <span className="perfil-usuario__menuitem"></span>


        </div>
    );
};

export default PerfilUsuario;
