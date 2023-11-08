import React from "react";
import "./Home.css";
import Banner from "../../Components/Banner/Banner";
import MainContent from "../../Components/Main/MainContent";
import VisionSection from "../../Components/VisionSection/VisionSection";
import ContactSection from "../../Components/ContactSection/ContactSection";
import Title from "../../Components/Title/Title";
import NextEvent from "../../Components/NextEvent/NextEvent";
import Container from "../../Components/Container/Container";

const HomePage = () => {
  return (
    <MainContent>
      <Banner />

      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Proximos Eventos"} />

          <div className="events-box">
            <NextEvent 
              title={"Event X"}
              description={"Evento legal"}
              eventDate={"16/11/2023"}
              idEvent={"1"}
            />
            <NextEvent />
            <NextEvent />
          </div>
        </Container>
      </section>

      <VisionSection />

      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
