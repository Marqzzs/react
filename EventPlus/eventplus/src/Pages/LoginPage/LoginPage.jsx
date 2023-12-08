import React, { useContext, useEffect, useState } from "react";
import "./LoginPage.css";

// Importando Componentes
import ImageIllustrator from "../../components/ImageIlustrator/ImageIlustrator";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { loginResource } from "../../Services/Service";
import { useNavigate } from "react-router-dom";

// Importando as contexts
import { UserContext, userDecodeToken } from "../../context/AuthContext";

// Importando Imagens
import loginImage from "../../assets/images/login.svg"
import logo from "../../assets/images/logo-pink.svg";

const LoginPage = () => {

    const [user, setUser] = useState({ email: "", senha: "" });

    // Importando as propriedades de nossa context através de um destructuring
    const {userData, setUserData} = useContext(UserContext); //importa os dados globais do usuário

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const promise = await api.post(loginResource, user)

            console.log("Dados do Usuário");
            console.log(promise.data.token);

            const userFullToken = userDecodeToken(promise.data.token);

            // guarda o token na variável podendo ser usada em qualquer componente filho;
            setUserData(userFullToken)
            
            // A função JSON.stringify transforma um ojeto em uma única string, podendo assim ser armazenada em um localStorage
            localStorage.setItem("token", JSON.stringify(userFullToken))

            navigate("/")



        } catch (error) {
            // Erro da api: bad request (401) ou erro de conexão
            alert("Verifique os dados e a conexão com a internet")

            console.log("Erro no login do usuário");
            console.log(error);
        }
    }


    return (
        <div className="layout-grid-login">
            <div className="login">
                <div className="login__illustration">
                    <div className="login__illustration-rotate"></div>
                    <ImageIllustrator
                        imageRender={loginImage}
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
                            manipulatorFunction={(e) => {
                                setUser({
                                    ...user,
                                    email: e.target.value
                                })
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
                            manipulatorFunction={(e) => {
                                setUser({
                                    ...user,
                                    senha: e.target.value.trim()
                                })
                            }}
                            placeholder="****"
                        />

                        <a href="" className="frm-login__link">
                            Esqueceu a senha?
                        </a>

                        <Button
                            textButton="Login"
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
