import React, { useContext, useEffect, useState } from "react";
//import Header from "../../Components/Header/Header";
import MainContent from "../../Components/Main/MainContent";
import Title from "../../Components/Title/Title";
import Table from "./TableEva/TableEva";
import Container from "../../Components/Container/Container";
import { Select } from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
import api from "../../Services/Services";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";
import {
  eventsResource,
  myEventsResource,
  presencesEventsResource,
  commentsResource
} from "../../Services/Services";

const EventosAlunoPage = () => {
  // state do menu mobile
  //const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [comentarios, setComentarios] = useState([]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    async function loadEventsType() {
      if (tipoEvento === "1") {
        try {
          const retornoEventos = await api.get(eventsResource);
          const myRetornoEventos = await api.get(
            myEventsResource + userData.userId
          );

          const eventosMarcados = verificarPresenca(
            retornoEventos.data,
            myRetornoEventos.data
          );
          setEventos(eventosMarcados);

          console.clear();
          console.log("todos os eventos");
          console.log(retornoEventos.data);
          console.log("meus os eventos");
          console.log(myRetornoEventos.data);
          console.log("eventos marcados");
          console.log(eventosMarcados);
        } catch (error) {
          console.log(`Erro na api ${error}`);
        }
      } else if (tipoEvento === "2") {
        try {
          const retornoEventos = await api.get(
            myEventsResource + userData.userId
          );
          console.log(retornoEventos.data);

          const arrEventos = [];

          retornoEventos.data.forEach((e) => {
            arrEventos.push({ 
              ...e.evento, 
              situacao: e.situacao,
            idPresencaEvento: e.idPresencaEvento });
          });

          setEventos(arrEventos);
          console.log(arrEventos);
        } catch (error) {
          console.log(`Erro na api ${error}`);
        }
      } else {
        setEventos([]);
      }
    }
    loadEventsType();
  }, [tipoEvento]);

  async function loadEventsType() {
    try {
      const retorno = await api.get(eventsResource);
      const dados = await retorno.data;
      setEventos(dados);
      console.log(dados);
    } catch (error) {
      console.log("Deu ruim na api");
    }
  }

  const verificarPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.lenght; x++) {
      //para cada evento
      for (let i = 0; i < eventsUser.lenght; i++) {
        //procurar a corre

        if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {
          arrAllEvents[x].situacao = true;
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break; //para de procurar para o evento principal atual
        }
      }
    }
    return arrAllEvents;
  };

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    const promise = await api.get(`${commentsResource}/${idComentary}`);

    const dados = await promise.data;

    setComentarios(dados);
    console.log(dados);
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  async function postMyCommentary(idComentary){
    return ""
  }

  async function handleConnect(eventId, whatTheFunction, presencaId = null) {
    if (whatTheFunction === "connect") {
      try {
        const promise = await api.post(presencesEventsResource, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId,
        });
        if (promise.status === 201) {
          loadEventsType();
          alert("Presenca confirmada");
        }
      } catch (error) {}
      return;
    }
    try {
      const unconnected = await api.delete(
        `${presencesEventsResource}/${presencaId}`
      );
      if (unconnected.status === 204) {
        loadEventsType();
       alert("Presenca desconfirmada")
      }
    } catch (error) {
      console.log("Erro ao desconectar no evento");
      console.log(error);
      return;
    }
  }

  return (
    <>
      <MainContent>
        <Container>
          <Title titleText={"Eventos"} potatoClass="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            value={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
          fnGet={loadMyComentary}
          fnPost={postMyCommentary}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
