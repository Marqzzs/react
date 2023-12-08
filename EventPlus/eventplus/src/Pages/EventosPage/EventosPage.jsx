import React, { useEffect, useState } from 'react';
import './EventosPage.css'

// Importando Imagens
import eventoImage from '../../assets/images/evento.svg';
import Notification from '../../components/Notification/Notification';

// Importando Componentes
import Container from '../../components/Container/Container';
import ImageIlustrator from '../../components/ImageIlustrator/ImageIlustrator';
import MainContent from '../../components/MainContent/MainContent';
import Title from '../../components/Title/Title';
import { Button, Input, Select } from '../../components/FormComponents/FormComponents';
import api, { eventsResource, eventsTypeResource } from '../../Services/Service';
import TableTp from './TableTp/TableTp';
import Spinner from '../../components/Spinner/Spinner';

import { dateFormatDbToViewEfetivo, dateFormatDbToViewEfetivoContrario } from '../../Utils/stringFunctions';


const EventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(true); //Está cadastrando?
    const [listEvento, setListEvento] = useState([]); //Lista de Eventos
    const [tipoEvento, setTipoEvento] = useState([]); //Array de objetos para a utilização do options no cadastro
    const [notifyUser, setNotifyUser] = useState(); //Componente Notification
    const [showSpinner, setShowSpinner] = useState(false);

    const [listTipoEvento, setListTipoEvento] = useState([{
        value: "",
        text: ""
    }]); //Array de objetos para a utilização do select
    const [evento, setEvento] = useState({
        dataEvento: "",
        nomeEvento: "",
        descricao: "",
        idTipoEvento: "",
        idInstituicao: "860669ec-c897-48c1-90f9-39f4113e3b8f" //!ATENÇÃO AQUI ESTÁ O ID DA INSTITUIÇÃO
    }) //Objeto para o cadastro e a edição


    async function getTypeEvent() {
        // Lista do Tipo de eventos
        const tipoEventos = await api.get(eventsTypeResource);
        setTipoEvento(tipoEventos.data)

        ListTypeTransform();
    }

    async function getEvent() {
        // Lista dos Eventos
        const eventos = await (await api.get(eventsResource)).data
        setListEvento(eventos);
    }

    function ListTypeTransform() {
        
        const list = tipoEvento.map((e) => ({
            value: e.idTipoEvento,
            text: e.titulo
        }))

        setListTipoEvento(list);

    }

    useEffect(() => {
        async function loadEventType() {
            try {

                getTypeEvent();
                getEvent();


            } catch (error) {
                alert("Erro na api Eventos");
                console.log(error());
            }
        }

        loadEventType();
    }, [])


    function Aviso(key) { // 1 = Titulo pelo menos 3 char, 2 = exclusão, 3 = cadastro, 4= Atualização

        switch (key) {

            case 1:
                setNotifyUser({
                    titleNote: "Aviso",
                    textNote: `O titulo deve conter pelo menos 3 caracteres`,
                    imgIcon: "warning",
                    imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
                    showMessage: true
                });
                break;
            case 2:
                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: `Evento excluído com sucesso`,
                    imgIcon: "success",
                    imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
                    showMessage: true
                });
                break;
            case 3:
                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: `Evento cadastrado com sucesso`,
                    imgIcon: "success",
                    imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
                    showMessage: true
                });
                break;
            case 4:
                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: `Evento atualizado com sucesso`,
                    imgIcon: "success",
                    imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
                    showMessage: true
                });
                break;
            default:
                alert("Não foi colocado um Aviso adequado");
                break;
        }
    }

    function clearEvento() {

        setEvento({
            ...evento,
            dataEvento: "",
            nomeEvento: "",
            descricao: "",
            idTipoEvento: "",
        })

        getEvent();
    }


    // todo ****************Cadastro*******************
    async function handleSubmit(e) {
        e.preventDefault();

        setShowSpinner(true);
        try {

            const retorno = await api.post(eventsResource, {

                "dataEvento": evento.dataEvento,
                "nomeEvento": evento.nomeEvento,
                "descricao": evento.descricao,
                "idTipoEvento": evento.idTipoEvento,
                "idInstituicao": evento.idInstituicao

            })
            Aviso(3);
            clearEvento();

        } catch (error) {
            alert("Erro na API")
            console.log(error);
        }

        setShowSpinner(false);

    }

    // todo ************Apagar****************
    async function handleDelete(idEvento) {

        setShowSpinner(true);

        try {

            if (window.confirm(`Confirmar a exclusão do evento?`)) {

                const retorno = await api.delete(eventsResource + `/${idEvento}`)
                if (retorno.status === 204 || retorno.status === 200 || retorno.status === 202) {
                    Aviso(2);
                    clearEvento();
                }
            }
        } catch (error) {
            alert("erro na api")
            console.log(error);
        }

        setShowSpinner(false);
    }

    // todo ****************Editar**********************
    async function handleUpdate(e) {
        e.preventDefault();

        try {

            console.log(evento);

            const retorno = await (api.put(`${eventsResource}/${evento.idEvento}`, {

                "dataEvento": evento.dataEvento,
                "nomeEvento": evento.nomeEvento,
                "descricao": evento.descricao,
                "idTipoEvento": evento.idTipoEvento,
                "idInstituicao": evento.idInstituicao

            }))

            Aviso(4);
            clearEvento();

        } catch (error) {
            alert("Erro no update")
            console.log(error);
        }

    }

    // todo ************Edição MOSTRAR************
    async function showUpdate(evento) {
        setFrmEdit(false);

        try {


            console.log(evento);

            setEvento({
                idEvento: evento.idEvento,
                dataEvento: evento.dataEvento,
                descricao: evento.descricao,
                nomeEvento: evento.nomeEvento,
                idInstituicao: evento.idInstituicao,
                idTipoEvento: evento.idTipoEvento
            })

            window.scroll({ top: 0, left: 0, behavior: "smooth" })




        } catch (error) {
            alert("Erro na busca do evento")
            console.log(error);
        }
    }

    // todo ************Edição ESCONDER************
    async function hideUpdate() {

        setFrmEdit(true);

        clearEvento();

    }


    return (
        <>
            {/* Linha para a inclusão da notificação */}
            <Notification {...notifyUser} setNotifyUser={setNotifyUser} />

            {/* Spinner - feito com position */}
            {showSpinner ? <Spinner /> : null}

            <MainContent>
                <section className="cadastro-evento-section">
                    <Container>
                        <div className="cadastro-evento__box">


                            <Title titleText={"Cadastro Eventos"} />
                            <ImageIlustrator imageRender={eventoImage} />

                            <form
                                className='ftipo-evento'
                                onSubmit={frmEdit ? handleSubmit : handleUpdate}
                            >

                                {/* Cadastrar ou editar? */}
                                {frmEdit ? (




                                    // Cadastrar
                                    <>
                                        <Input
                                            key={"Nome"}
                                            id={"Nome"}
                                            name={"nomeEvento"}
                                            placeholder={"Nome"}
                                            required={"required"}
                                            type={"text"}
                                            value={evento.nomeEvento}
                                            manipulatorFunction={z =>
                                                setEvento({
                                                    ...evento,
                                                    "nomeEvento": z.target.value
                                                })
                                            }
                                        />
                                        <Input
                                            key={"Descricao"}
                                            id={"Descricao"}
                                            name={"descricao"}
                                            placeholder={"Descrição"}
                                            required={"required"}
                                            type={"text"}
                                            value={evento.descricao}
                                            manipulatorFunction={z =>
                                                setEvento({
                                                    ...evento,
                                                    "descricao": z.target.value
                                                })} />
                                        <Select
                                            id={'TipoEvento'}
                                            name={"tipoEvento"}
                                            key={'TipoEvento'}
                                            required={"required"}
                                            options={tipoEvento}
                                            defaultValue={evento.idTipoEvento}
                                            manipulatorFunction={z => {
                                                setEvento({
                                                    ...evento,
                                                    'idTipoEvento': z.target.value
                                                });
                                            }} />
                                        <Input
                                            key={"Data"}
                                            id={"Data"}
                                            name={"data"}
                                            placeholder={"Data"}
                                            required={"required"}
                                            type={"date"}
                                            value={evento.dataEvento}
                                            manipulatorFunction={z =>
                                                setEvento({
                                                    ...evento,
                                                    "dataEvento": z.target.value
                                                })} />
                                        <Button
                                            id={"Cadastrar"}
                                            name={"cadastrar"}
                                            textButton={"Cadastrar"}
                                            type={"sumbit"}
                                        />
                                    </>
                                ) : (





                                    // Editar

                                    <>
                                        <Input
                                            key={"Nome"}
                                            id={"Nome"}
                                            name={"nome"}
                                            placeholder={"Nome"}
                                            required={"required"}
                                            type={"text"}
                                            value={evento.nomeEvento}
                                            manipulatorFunction={z =>
                                                setEvento({
                                                    ...evento,
                                                    "nomeEvento": z.target.value
                                                })} />
                                        <Input
                                            key={"descricao"}
                                            id={"descricao"}
                                            name={"descricao"}
                                            placeholder={"Descrição"}
                                            required={"required"}
                                            type={"text"}
                                            value={evento.descricao}
                                            manipulatorFunction={z =>
                                                setEvento({
                                                    ...evento,
                                                    "descricao": z.target.value
                                                })}
                                        />
                                        <Select
                                            id={'TipoEvento'}
                                            name={"tipoEvento"}
                                            key={'TipoEvento'}
                                            required={"required"}
                                            options={tipoEvento}
                                            defaultValue={evento.idTipoEvento}
                                            manipulatorFunction={z =>
                                                setEvento({
                                                    ...evento,
                                                    idTipoEvento: z.target.value
                                                })}
                                        />
                                        <Input
                                            key={"Data"}
                                            id={"Data"}
                                            name={"data"}
                                            placeholder={"Data"}
                                            required={"required"}
                                            type={"date"}
                                            value={dateFormatDbToViewEfetivoContrario(evento.dataEvento)}
                                            manipulatorFunction={z =>
                                                setEvento({
                                                    ...evento,
                                                    "dataEvento": z.target.value
                                                })} />
                                        <Button
                                            id={"Atualizar"}
                                            name={"atualizar"}
                                            textButton={"Atualizar"}
                                            type={"sumbit"}
                                        />
                                        <Button
                                            id={"Cancelar"}
                                            name={"cancelar"}
                                            textButton={"Cancelar"}
                                            type={"button"}
                                            manipulatorFunction={() => {
                                                hideUpdate();
                                            }}
                                        />

                                    </>
                                )}


                            </form>


                        </div>
                    </Container>
                </section>

                <section className="lista-eventos-section">
                    <Container>

                        <Title
                            titleText={"Lista de Eventos"}
                            color="white" />

                        <TableTp
                            dados={listEvento}
                            fnDelete={handleDelete}
                            fnUpdate={showUpdate}
                        />

                    </Container>
                </section>
            </MainContent>
        </>
    )
}

export default EventosPage;