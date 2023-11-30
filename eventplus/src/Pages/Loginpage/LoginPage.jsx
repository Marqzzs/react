import React, { useContext, useEffect, useState } from "react";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import api, { loginResource } from "../../Services/Services";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { UserContext, userDecodeToken } from "../../context/AuthContext";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "adm@adm.com", senha: "123456" });
  const { userData, setUserData } = useContext(UserContext); //import os dados globais
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.nome) {
      navigate("/");
    }
  }, [userData]);

  async function handleSubmit(e) {
    e.preventDefault();

    //validar usario e senha
    //tamanho minino de caracteres para senha:
    if (user.email.length >= 3 && user.senha.length >= 3) {
      try {
        const promise = await api.post(loginResource, {
          email: user.email,
          senha: user.senha,
        });

        const userFullToken = userDecodeToken(promise.data.token);

        //guarda o token globalmente
        setUserData(userFullToken);

        localStorage.setItem("token", JSON.stringify(userFullToken));
        navigate("/");
      } catch (error) {
        alert("Verifique os dados e a conexao com a internet");
      }
    } else {
      alert("Minino de caracteres nao atingido");
    }
  }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageName="login"
            altText="Imagem de um homem em frente de uma porta de entrada"
            additionalClass="login-illustrator "
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <Input
              additionalClass="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              manipulationFunction={(e) => {
                setUser({ ...user, email: e.target.value.trim() });
              }}
              placeholder="Username"
            />
            <Input
              additionalClass="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) => {
                setUser({ ...user, senha: e.target.value.trim() });
              }}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              textButton="Login"
              placeholder="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              className="frm-login__button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
