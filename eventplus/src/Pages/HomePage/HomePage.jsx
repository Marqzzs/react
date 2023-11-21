import React, { useEffect, useState } from "react";
import "./Home.css";
import Banner from "../../Components/Banner/Banner";
import MainContent from "../../Components/Main/MainContent";
import VisionSection from "../../Components/VisionSection/VisionSection";
import ContactSection from "../../Components/ContactSection/ContactSection";
import Title from "../../Components/Title/Title";
import NextEvent from "../../Components/NextEvent/NextEvent";
import Container from "../../Components/Container/Container";
import api from "../../Services/Services";
import {nextEventResource} from "../../Services/Services"
import Notification from "../../Components/Notification/Notification";

const HomePage = () => {

  const [nextEvents, setNextEvents] = useState([]); //dados mocados
  const [notifyUser, setNotifyUser] = useState();

  useEffect(() => {

    async function getNextEvents() {

      try {
        const promise = await api.get(nextEventResource);
        const dados = await promise.data;

        setNextEvents(dados);//atualiza o state

      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Não foi possivel mostrar os eventos`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustracao de erro. Mulher segurando uma bolinha com o X",
          showMessage: true,
        });
      }

    }

    getNextEvents();//roda logo apos inicializar
  },[])

  return (
    <MainContent>
      <Banner />

      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Proximos Eventos"} />

          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <NextEvent
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvent={e.idEvento}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <VisionSection />

      <ContactSection />
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
    </MainContent>
  );
};

export default HomePage;
