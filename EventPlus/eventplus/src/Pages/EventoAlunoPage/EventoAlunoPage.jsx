import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select, SelectMyEvents } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, { eventsResource, nextEventResource, presenceEventResource, commentsResource } from "../../Services/Service";

import "./EventoAlunoPage.css";
import { UserContext } from "../../context/AuthContext";
import Notification from "../../components/Notification/Notification";

const EventoAlunoPage = () => {
    // state do menu mobile
    const [exibeNavbar, setExibeNavbar] = useState(false);
    const [eventos, setEventos] = useState([]); //Eventos para serem buscados
    // select mocado
    const [quaisEventos, setQuaisEventos] = useState([
        { value: 1, text: "Todos os eventos" },
        { value: 2, text: "Meus eventos" },
    ]);

    const [notifyUser, setNotifyUser] = useState(); //Componente Notification

    const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido É UMA STRING
    const [showSpinner, setShowSpinner] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // recupera os dados globais do usuário
    const { userData, setUserData } = useContext(UserContext);
    const [comentario, setComentario] = useState("")

    async function LoadEvents() {
        if (tipoEvento === "1") { // os eventos completos
            try {
                // listar os aventos
                const todoEvento = (await (await api.get(eventsResource)).data);
                const meuEvento = await (await api.get(`${presenceEventResource}/${userData.UserId}`)).data
                const eventosMarcados = verificaPresença(todoEvento, meuEvento)

                setEventos(eventosMarcados);

            } catch (error) {
                console.log(error);
            }

        }
        else if (tipoEvento === "2") { //os eventos do aluno
            try {
                // Listar os eventos do aluno
                const request = (await (await api.get(`${presenceEventResource}/${userData.UserId}`)).data);

                const arrEventos = [];

                request.map((pr) => {
                    arrEventos.push({
                         ...pr.evento, 
                         situacao: true,
                        idPresencaEvento: pr.idPresencaEvento})
                })

                setEventos(arrEventos)

            } catch (error) {
                alert("Erro em carregar os eventos do aluno")
                console.log(error);
            }

        }
        else {
            setEventos([]);
        }
    }

    useEffect(() => {
        LoadEvents();
    }, [tipoEvento, userData.UserId]);


    const verificaPresença = (arrAllEvents, eventsUser) => {

        for (let x = 0; x < arrAllEvents.length; x++) { //para cada evento

            for (let i = 0; i < eventsUser.length; i++) { // procurar a corre

                if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {

                    arrAllEvents[x].situacao = true;
                    arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento
                    break; //paro de procurar para o evento principal atual
                }
            }
        }

        return arrAllEvents;
    }

    // toggle meus eventos ou todos os eventos
    function myEvents(tpEvent) {
        setTipoEvento(tpEvent);
    }

    const showHideModal = (idEvent) => {
        setShowModal(showModal ? false : true);

        setUserData({...userData, idEvento: idEvent})
    };

    // ler um comentário
    async function loadMyCommentary(idUsuario, idEvento) {
        try {
            const promise = await api.get(`${commentsResource}?idUsuario=${userData.userId}&idEvento=${userData.idEvento}`)
            console.clear()
            setComentario(promise.data[0].descricao)
            console.log(promise.data);
        } catch (error) {
            console.log(error);
        }
    }   

    // Cadastra um comentário
    async function postMyCommentary(descricao, idUsuario, idEvento) {
        try {
            const promise = api.post(commentsResource, {
                descricao: descricao,
                exibe: true,
                idUsuario: idUsuario,
                idEvento: idEvento
            });

            if (promise === 200) {
                alert("Comentario criado com sucesso")

                loadMyCommentary();
            }
        } catch (error) {
            console.log("deu ruim");
            console.log(error);
        }
    }

    // remove o comentário
    async function removeMyCommentary(){
        alert("Remover o comentário");
    };

    async function handleConnect(idEvento, whatTheFunction, presencaId = null) {

        if (whatTheFunction === "connect") {
            try {
                const obj = {
                    situacao: true,
                    idUsuario: userData.UserId,
                    idEvento: idEvento
                }

                const retorno = await api.post(presenceEventResource, obj)

                if (retorno.status === 201 || retorno.status === 200 || retorno.status === 204) {
                    LoadEvents();
                }


            } catch (error) {
                alert(error)
            }
            return;
        }

        try {
            const unconnected = await api.delete(`${presenceEventResource}/${presencaId}`);

            if (unconnected.status === 201 || unconnected.status === 200 || unconnected.status === 204) {
                LoadEvents();
            }

        } catch (error) {
            alert("Erro na deleção da presença")
            console.log(error)
        }
    }

    return (
        <>
            {/* Linha para a inclusão da notificação */}
            <Notification {...notifyUser} setNotifyUser={setNotifyUser} />

            <MainContent>
                <Container>
                    <Title titleText={"Eventos"} className="custom-title" />

                    <SelectMyEvents
                        id="id-tipo-evento"
                        name="tipo-evento"
                        required={"required"}
                        className="select-tp-evento"
                        options={quaisEventos} // aqui o array dos tipos
                        manipulatorFunction={(e) => {
                            myEvents(e.target.value)
                        }}
                        defaultValue={tipoEvento}
                    />

                    {/* Todos ou Meus Eventos? */}
                    {tipoEvento === 1 ? (
                        <>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                    <Table
                        dados={eventos}
                        fnConnect={handleConnect}
                        fnShowModal={showHideModal}
                    />
                </Container>
            </MainContent>

            {/* SPINNER -Feito com position */}
            {showSpinner ? <Spinner /> : null}

            {showModal ? (
                <Modal
                    // userId={userData.userId}
                    showHideModal={showHideModal}
                    fnGet={loadMyCommentary}
                    fnPost={postMyCommentary}
                    fnDelete={removeMyCommentary}
                    comentaryText={comentario}
                />
            ) : null}
        </>
    );
};

export default EventoAlunoPage;