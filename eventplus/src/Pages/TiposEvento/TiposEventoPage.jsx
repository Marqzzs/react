import React, { useEffect, useState } from "react";
import "./TiposEvento.css";
import Title from "../../Components/Title/Title";
import MainContent from "../../Components/Main/MainContent";
import Container from "../../Components/Container/Container";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Services";
import TableTP from "./TableTP/TableTP";
import Notification from "../../Components/Notification/Notification";

const TiposEventoPage = () => {
  const [frmEdit, setFrmEdit] = useState(false); //esta em edicao?
  const [titulo, setTitulo] = useState("");
  const [tipoEventos, setTipoEventos] = useState([]);
  const [notifyUser, setNotifyUser] = useState();

  useEffect(() => {
    async function loadEventsType() {
      try {
        const retorno = await api.get(eventsTypeResource);
        const dados = await retorno.data;
        console.log(dados);

        setTipoEventos(dados);

        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }
    }
    loadEventsType();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (titulo.trim().length < 3) {
      alert("O titulo deve ter pelo menos 3 caracteres");
    }

    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo: titulo,
      });
      console.log(retorno);
      setTitulo("");

      alert("Cadastrado com sucesso");
    } catch (error) {
      alert("deu ruim na api");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    
  }

  // Apaga o tipo de evento
  async function handleDelete(idElement) {
    try {
      //Verifica se deseja excluir
      if (window.confirm("Confirma a exclusao?")) {
        const response = await api.delete(`${eventsTypeResource}/${idElement}`);

        if (response.status == 204) {
          setNotifyUser({
            titleNote: "Sucesso",
            textNote: `Tipo de Evento excluido com sucesso`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustracao de sucesso. Moca segurando um balao com simbolo de confirmacao ok",
            showMessage: true,
          });
        }
      }
      setTipoEventos([tipoEventos]);
    } catch (error) {
      setNotifyUser({
        titleNote: "Error",
        textNote: `Erro ao deletar objeto`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustracao de erro. Moca segurando um balao com simbolo de confirmacao ok",
        showMessage: true,
      });
    }
  }
  // cancela a tela de edicao
  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("")
    setNotifyUser({
      titleNote: "Cancelado",
      textNote: `Edicao cancelada com sucesso`,
      imgIcon: "danger",
      imgAlt:
        "Imagem de ilustracao de sucesso. Moca segurando um balao com simbolo de confirmacao ok",
      showMessage: true,
    });
  }
  //mostrar o formulario
  async function showUpdateForm(idElement) {
    try {
      setFrmEdit(true);
      const response = await api.get(`${eventsTypeResource}/${idElement}`);
      setTitulo(response.data.titulo)
    } catch (error) {
      setNotifyUser({
        titleNote: "Error",
        textNote: `Erro ao editar o objeto`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustracao de erro. Moco segurando um balao com simbolo de erro ok",
        showMessage: true,
      });
    }
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <MainContent>
        {/**Formulario de cadstro de tipos eventos */}
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              {/* titulo */}
              <Title titleText={"Cadastro Tipos de Eventos"} />

              {/* imagem de ilustracao */}
              <ImageIllustrator imageName={"tipoEvento"} additionalClass={""} />

              {/* componente de formulario */}
              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/** cadastrar ou editar? */}
                {!frmEdit ? (
                  //cadastrar
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Titulo"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
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
                  //editar
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Titulo"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
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

        {/**Section de Listagem de Eventos */}
        <section className="lista-eventos-section">
          <Container>
            <Title titleText={"Lista Tipos Eventos"} color="white" />
            <TableTP
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
              dados={tipoEventos}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TiposEventoPage;
