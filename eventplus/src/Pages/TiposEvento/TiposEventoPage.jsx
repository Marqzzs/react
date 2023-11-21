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
import Spinner from "../../Components/Spinner/Spinner"

const TiposEventoPage = () => {
  const [frmEdit, setFrmEdit] = useState(false); //esta em edicao?
  const [titulo, setTitulo] = useState("");
  const [idEvento, setIdEvento] = useState(null);
  const [tipoEventos, setTipoEventos] = useState([]);
  const [notifyUser, setNotifyUser] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    async function loadEventsType() {
      setShowSpinner(true)
      try {
        const retorno = await api.get(eventsTypeResource);
        const dados = await retorno.data;
        setTipoEventos(dados);

        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }
      setShowSpinner(false)
    }
    loadEventsType();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: `O titulo deve conter no minino 3 caracteres`,
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustracao de aviso. Mulher na frente de um ponto de exclamação",
        showMessage: true,
      });

      return;
    }

    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo: titulo,
      });
      console.log(retorno);
      setTitulo(titulo);

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastro concluido com sucesso`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustracao de sucesso. Mulher segurando uma imagem de sucesso",
        showMessage: true,
      });
      const buscaTipoEvento = await api.get(eventsTypeResource);
      setTipoEventos(buscaTipoEvento.data);

    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Não foi possivel cadastrar`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustracao de erro. Mulher segurando uma bolinha com um x",
        showMessage: true,
      });
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const response = await api.put(eventsTypeResource + "/" + idEvento, {
        titulo: titulo,
      });

      if (response.status === 204) {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `O Tipo de Evento foi Atualizado`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustracao de sucesso. Mulher segurando um ponto de sucesso",
          showMessage: true,
        });
        const buscaTipoEvento = await api.get(eventsTypeResource);
        setTipoEventos(buscaTipoEvento.data);

        editActionAbort();
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Não foi possivel atualizar`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustracao de erro. Mulher segurando uma bolinha com um x",
        showMessage: true,
      });
    }
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
      const buscaTipoEvento = await api.get(eventsTypeResource);
      setTipoEventos(buscaTipoEvento.data);
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
    setTitulo("");
    setIdEvento(null);
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
      setTitulo(response.data.titulo);
      setIdEvento(idElement);
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
      {showSpinner ? <Spinner /> : null}
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
