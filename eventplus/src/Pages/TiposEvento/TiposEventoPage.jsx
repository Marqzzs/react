import React, { useEffect, useState } from "react";
import "./TiposEvento.css";
import Title from "../../Components/Title/Title";
import MainContent from "../../Components/Main/MainContent";
import Container from "../../Components/Container/Container";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Services";
import TableTP from "./TableTP/TableTP";

const TiposEventoPage = () => {
  const [frmEdit, setFrmEdit] = useState(false); //esta em edicao?
  const [titulo, setTitulo] = useState("");
  const [tipoEventos, setTipoEventos] = useState([]);

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
  }, [tipoEventos]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (titulo.trim().length < 3) {
      alert("O titulo deve ter pelo menos 3 caracteres");
    }

    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo: titulo,
      });

      setTitulo("");

      alert("Cadastrado com sucesso");
    } catch (error) {
      alert("deu ruim na api");
    }
  }

  function handleUdate() {}

  // Apaga o tipo de evento
  async function handleDelete(idElement) {
    try {
      //Verifica se deseja excluir
      if (window.confirm("Confirma a exclusao?")) {
        const response = await api.delete(`${eventsTypeResource}/${idElement}`);

        if (response.status == 204) {
          alert(`Deletado com sucesso: ${idElement}`);
        }
      }
    } catch (error) {
      console.log(`Deu erro ${error}`);
    }
  }
  // cancela a tela de edicao
  function editActionAbort() {
    alert("Cancelar a tela de edicao de dados");
  }
  //mostrar o formulario
  function showUpdateForm() {
    alert(`Vamos mostrar o formulario de edicao`);
  }

  return (
    <>
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
                onSubmit={frmEdit ? handleUdate : handleSubmit}
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
                  <p>Tela de edicao</p>
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
