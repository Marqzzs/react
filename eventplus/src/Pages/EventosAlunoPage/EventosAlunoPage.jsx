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
import { eventsResource, myEventsResource } from "../../Services/Services";

const EventosAlunoPage = () => {
  // state do menu mobile
  //const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

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
          setEventos(retornoEventos.data);
          console.log(retornoEventos.data);
        } catch (error) {
          console.log(`Erro na api ${error}`);
        }
      }else if(tipoEvento === "2"){
        try {
          const retornoEventos = await api.get(myEventsResource + userData.userId)
          console.log(retornoEventos.data);

          const arrEventos = [];

          retornoEventos.data.forEach(e => {
            arrEventos.push(e.evento)
          });

          setEventos(arrEventos);
          console.clear()
          console.log(retornoEventos.data);
        } catch (error) {
          console.log(`Erro na api ${error}`);
        }
      }
    }
    loadEventsType();
  }, [tipoEvento]);

  const verificarPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.lenght; x++){//para cada evento
      for (let i = 0; i <eventsUser.lenght; i++){//procurar a corre
        if(arrAllEvents[x].idEvento === eventsUser[i].idEvento){
          arrAllEvents[x].situacao = true;
          break; //para de procurar para o evento principal atual
        }
      }
    }
  }

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  function handleConnect() {
    alert("Desenvolver a função conectar evento");
  }
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

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
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
