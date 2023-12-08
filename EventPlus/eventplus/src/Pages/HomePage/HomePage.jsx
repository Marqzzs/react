import React, { useEffect, useState } from 'react';
import './HomePage.css';

// Importando componentes
import Title from '../../components/Title/Title';
import Banner from '../../components/Banner/Banner';
import MainContent from '../../components/MainContent/MainContent';
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import NextEvent from '../../components/NextEvent/NextEvent';
import Container from '../../components/Container/Container';
import api from '../../Services/Service';

import { nextEventResource } from '../../Services/Service';

const HomePage = () => {
    //dados em "mocados"
    const [nextEvents, setNextEvents] = useState([]);

    //roda somente na inicialização do componente
    useEffect(() => {
        async function getNextEvents() {
            try {
                const promise = await api.get(nextEventResource)
                const dados = await promise.data;

                setNextEvents(dados); //atualiza o state
                console.log(dados);
            } catch (error) {
                alert("Deu ruim na api!")
            }
        }

        getNextEvents(); //roda a função
    }, [])



    return (
        <div>
            <MainContent>
                <Banner />
                <section className='proximos-eventos'>
                    <Container>
                        <Title titleText={"Próximos Eventos"} />

                        <div className="events-box">

                            {/* dentro da div event blocks nós criamos
                            um código de javascript usando as chaves */}
                            {
                                // Aqui chamamos a array criada e criamos um componente para cada item dela
                                nextEvents.map((e) => {
                                    return (
                                        <NextEvent
                                            key={e.idEvento}
                                            idEvent={e.idEvento}
                                            title={e.nomeEvento}
                                            description={e.descricao}
                                            eventDate={e.dataEvento}
                                            
                                        />
                                    );
                                })
                            }
                        </div>
                    </Container>

                </section>
                <VisionSection />
                <ContactSection />
            </MainContent>
        </div>
    );
};

export default HomePage;