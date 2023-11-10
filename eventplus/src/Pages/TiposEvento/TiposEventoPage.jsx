import React from "react";
import "./TiposEvento.css";
import Title from "../../Components/Title/Title";
import MainContent from "../../Components/Main/MainContent";
import Container from "../../Components/Container/Container";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";

const TiposEventoPage = () => {
  return (
    <>
      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento-box">
              {/* titulo */}
              <Title  titleText={"Cadastro Tipos de Eventos"}/>

              {/* imagem de ilustracao */}
              <ImageIllustrator />

              {/* componente de formulario */}
              <form className="ftipo-evento">
                <p>Formulario sera criado aqui</p>
              </form>
            </div>
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TiposEventoPage;
