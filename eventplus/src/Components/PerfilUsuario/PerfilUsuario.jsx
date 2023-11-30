import React, { useContext } from "react";
import iconeLogout from "../../assets/images/icone-logout.svg";
import "./PerfilUsuario.css";
import { UserContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const PerfilUsuario = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUserData({});
    navigate("/");
  };
  return (
    <div  className="perfil-usuario">
      {userData.nome ? (
        <>
          <span className="perfil-usuario__menuitem">{userData.nome}</span>
          <img
            title="Deslogar"
            className="perfil-usuario__icon"
            src={iconeLogout}
            alt="imagem ilustrativa de uma porta de saída do usuário "
            onClick={logout}
          />
        </>
      ) : (
        <Link to={"/Login"} className="perfil-usuario__menuitem">
          Login
        </Link>
      )}

      {/* <span className="perfil-usuario__menuitem"></span> */}
    </div>
  );
};

export default PerfilUsuario;
