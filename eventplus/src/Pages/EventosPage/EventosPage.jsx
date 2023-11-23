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
import api, {
  eventsResource,
  eventsTypeResource,
} from "../../Services/Services";
import Notification from "../../Components/Notification/Notification";
import TableE from "./TableE/TableE";

const ID_INSTITUICAO = "ce1a8561-f5fd-40fd-a340-0dc67010c203";

const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [evento, setEvento] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoEvento, setTipoEvento] = useState([]);
  const [data, setData] = useState("");
  const [idEvento, setIdEvento] = useState(null);
  const [idTipoEvento, setIdTipoEvento] = useState("");

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
      const dados = retorno.data;
      setTipoEvento(dados);
      console.log(retorno.data);
    } catch (error) {
      console.log("Erro na api");
      console.log(error);
    }
  }

  function dePara(retornoApi) {
    let arrayOptions = [];
    retornoApi.forEach((e) => {
      arrayOptions.push({ value: e.idTipoEvento, text: e.titulo });
    });
    return arrayOptions;
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
        nomeEvento: nome,
        descricao: descricao,
        dataEvento: data,
        idTipoEvento: idTipoEvento,
        idInstituicao: ID_INSTITUICAO,
      });

      console.log(retorno);
      setNome(nome);
      setDescricao(descricao);
      setTipoEvento(tipoEvento);
      setData(data);

      const buscaEvento = await api.get(eventsResource);
      setEvento(buscaEvento.data);

      // setNotifyUser({
      //   titleNote: "Sucesso",
      //   textNote: `O Evento foi cadastrado`,
      //   imgIcon: "success",
      //   imgAlt:
      //     "Imagem de ilustracao de sucesso. Mulher segurando um ponto de sucesso",
      //   showMessage: true,
      // });
    } catch (error) {
      console.log({
        nome: nome,
        descricao: descricao,
        data: data,
        idTipoEvento: idTipoEvento,
        idInstituicao: ID_INSTITUICAO,
      });
      alert("Deu ruim");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const response = await api.put(`${eventsResource}/${idEvento}`, {
        nomeEvento: nome,
        descricao: descricao,
        dataEvento: data,
        idTipoEvento: idTipoEvento,
        idInstituicao: ID_INSTITUICAO,
      });

      const buscaEvento = await api.get(eventsResource);
      setEvento(buscaEvento.data);
    } catch (error) {
      
    }
  }

  async function handleDelete(idElement) {
    try {
      if (window.confirm("Confirma a exlusao?")) {
        const response = await api.delete(`${eventsResource}/${idElement}`);

        if (response.status == 204) {
          alert("Excluido com sucesso");
        }
      }
     
      const buscaEvento = await api.get(eventsResource);
      setEvento(buscaEvento.data);
    } catch (error) {
      alert("Deu familia");
    }
  }

  function editActionAbort() {
    setFrmEdit(false);
    setNome("");
    setDescricao("")
    setIdTipoEvento("")
    setData("")
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
      setNome(response.data.nomeEvento);
      setDescricao(response.data.descricao);
      setIdTipoEvento(response.data.idTipoEvento);

      // Formatar a data para o formato "yyyy-MM-dd"
      const eventData = response.data.dataEvento;
      const formattedDate = new Date(eventData).toISOString().split("T")[0];
      setData(formattedDate);

      setIdEvento(idElement);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/*{<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}*/}
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
                      name={"tipoEvento"}
                      required={"required"}
                      value={idTipoEvento}
                      options={dePara(tipoEvento)}
                      manipulationFunction={(e) => {
                        setIdTipoEvento(e.target.value);
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
                    <Select
                      id="TipoEvento"
                      name={"tipoEvento"}
                      required={"required"}
                      value={idTipoEvento}
                      options={dePara(tipoEvento)}
                      manipulationFunction={(e) => {
                        setIdTipoEvento(e.target.value);
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
