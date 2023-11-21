import React from "react";
import "./EventosPage.css";
import Title from "../../Components/Title/Title";
import MainContent from "../../Components/Main/MainContent";
import Container from "../../Components/Container/Container";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";

const EventosPage = () => {
  return (
    <>
      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              {/**Titulo */}
              <Title titleText="Cadastro de Evento"/>
              {/**Imagem */}
              <ImageIllustrator imageName={"evento"}/>
              {/**Formulario */}
            </div>
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
