import React, { useEffect, useState } from "react";
import "./EventosPage.css";
import Title from "../../Components/Title/Title";
import MainContent from "../../Components/Main/MainContent";
import Container from "../../Components/Container/Container";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import {
  Button,
  Input,
  Select,
} from "../../Components/FormComponents/FormComponents";
import api, { eventsResource, eventsTypeResource } from "../../Services/Services";
import Notification from "../../Components/Notification/Notification";
import TableE from "./TableE/TableE";

const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [evento, setEvento] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoEvento, setTipoEvento] = useState([]);
  const [data, setData] = useState("");
  const [idEvento, setIdEvento] = useState(null);

  async function loadEvents() {
    try {
      const retorno = await api.get(eventsResource);
      const dados = await retorno.data;
      setEvento(dados);
      console.log(dados);
    } catch (error) {
      console.log("Deu ruim na api");
    }
  }

  async function loadEventsType() {
    try {
      const retorno = await api.get(eventsTypeResource);
      const dados = await retorno.data;
      setTipoEvento(dados);

      console.log(retorno.data);
    } catch (error) {
      console.log("Erro na api");
      console.log(error);
    }
  }

  useEffect(() => {
    loadEvents();
    loadEventsType();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (nome.trim().length < 3) {
      alert("O nome deve conter no minimo 3 caracteres");
      return;
    }
    try {
      const retorno = await api.post(eventsResource, {
        nome: nome,
        descricao: descricao,
        tipoEvento: tipoEvento,
        data: data,
      });

      console.log(retorno);
      setNome(nome);
      setDescricao(descricao);
      setTipoEvento(tipoEvento);
      setData(data);

      const buscaEvento = await api.get(eventsResource);
      setEvento(buscaEvento.data);
    } catch (error) {
      console.log(error);
      alert("Deu ruim");
    }
  }

  async function handleUpdate(e) {}

  async function handleDelete(idElement) {
    try {
      if (window.confirm("Confirma a exlusao?")) {
        const response = await api.delete(`${eventsResource}/${idElement}`);

        if (response.status == 204) {
          alert("Excluido com sucesso");
        }
      }
      setEvento([evento]);
      const buscaEvento = await api.get(eventsResource);
      setEvento(buscaEvento.data);
    } catch (error) {
      alert("Deu familia");
    }
  }

  function editActionAbort() {
    setFrmEdit(false);
    setNome("");
    setIdEvento(null);
    // setNotifyUser({
    //   titleNote: "Cancelado",
    //   textNote: `Edicao cancelada com sucesso`,
    //   imgIcon: "warning",
    //   imgAlt:
    //     "Imagem de ilustracao de aviso. Mulher na frente do ponto de interrogacao",
    //   showMessage: true,
    // });
  }

  async function showUpdateForm(idElement) {
    try {
      setFrmEdit(true);
      const response = await api.get(`${eventsResource}/${idElement}`);
      setNome(response.data.Nome);
      setDescricao(response.data.Descricao);
      //setTipoEvento(response.data.TipoEvento);
      setData(response.data.DataEvento);
      setIdEvento(idElement);
    } catch (error) {
      // setNotifyUser({
      //   titleNote: "Error",
      //   textNote: `Erro ao editar o objeto`,
      //   imgIcon: "danger",
      //   imgAlt:
      //     "Imagem de ilustracao de erro. Moco segurando um balao com simbolo de erro ok",
      //   showMessage: true,
      // });
    }
  }

  return (
    <>
      {/* {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />} */}
      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              {/**Titulo */}
              <Title titleText="Cadastro de Evento" />
              {/**Imagem */}
              <ImageIllustrator imageName={"evento"} />
              {/**Formulario */}
              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/**Cadastrar ou Editar? */}
                {!frmEdit ? (
                  //Cadastrar
                  <>
                    <Input
                      id="Nome"
                      placeholder="Nome"
                      name={"nome"}
                      type={"text"}
                      required={"required"}
                      value={nome}
                      manipulationFunction={(e) => {
                        setNome(e.target.value);
                      }}
                    />
                    <Input
                      id="Descricao"
                      placeholder="Descricao"
                      name={"descricao"}
                      type={"text"}
                      required={"required"}
                      value={descricao}
                      manipulationFunction={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />
                    <Select
                      id="TipoEvento"
                      placeholder="Tipo Evento"
                      name={"tipoEvento"}
                      type={"select"}
                      required={"required"}
                      options={tipoEvento}
                      manipulationFunction={(e) => {
                        setTipoEvento(e.target.value);
                      }}
                    />
                    <Input
                      id="Data"
                      placeholder="Data"
                      name={"data"}
                      type={"Date"}
                      required={"required"}
                      value={data}
                      manipulationFunction={(e) => {
                        setData(e.target.value);
                      }}
                    />
                    <Button
                      textButton={"Cadastrar"}
                      id="cadastrar"
                      name="cadastrar"
                      type="submit"
                    />
                  </>
                ) : (
                  //Editar
                  <>
                    <Input
                      id="Nome"
                      placeholder="Nome"
                      name={"nome"}
                      type={"text"}
                      required={"required"}
                      value={nome}
                      manipulationFunction={(e) => {
                        setNome(e.target.value);
                      }}
                    />
                    <Input
                      id="Descricao"
                      placeholder="Descricao"
                      name={"descricao"}
                      type={"text"}
                      required={"required"}
                      value={descricao}
                      manipulationFunction={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />
                    <Input
                      id="TipoEvento"
                      placeholder="Tipo Evento"
                      name={"tipoEvento"}
                      type={"text"}
                      required={"required"}
                      value={tipoEvento}
                      manipulationFunction={(e) => {
                        setTipoEvento(e.target.value);
                      }}
                    />
                    <Input
                      id="Data"
                      placeholder="Data"
                      name={"data"}
                      type={"Date"}
                      required={"required"}
                      value={data}
                      manipulationFunction={(e) => {
                        setData(e.target.value);
                      }}
                    />
                    <div className="buttons-editbox">
                      <Button
                        textButton={"Atualizar"}
                        id="atualizar"
                        name="atualizar"
                        type="submit"
                        additionalClass={"button-component--middle"}
                      />

                      <Button
                        textButton={"Cancelar"}
                        id="cancelar"
                        name="cancelar"
                        type="button"
                        additionalClass={"button-component--middle"}
                        manipulationFunction={editActionAbort}
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </Container>
        </section>

        {/**Section de listagem de Eventos */}
        <section className="lista-eventos-section">
          <Container>
            <Title titleText={"Lista de Eventos"} color="white" />
            <TableE
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
              dados={evento}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
