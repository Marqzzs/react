import React from 'react';
import './NextEvent.css'
import { dateFormatDbToView, dateFormatDbToViewEfetivo } from "../../Utils/stringFunctions"
import { Tooltip } from 'react-tooltip';

const NextEvent = ({ title, description, eventDate, idEvent }) => {
    function conectar(idEvent) {
        // dá pra usar a prop idEvent? testar
        alert(`Chamar o recurso para conectar: ${idEvent}`)
    }

    return (
        <article className='event-card'>
            <h2 className='event-card__title'>{title}</h2>

            <p
                className='event-card__description'
                data-tooltip-id="my-tooltip"
                data-tooltip-content={description}
                data-tooltip-place="top"
            >
                <Tooltip id="my-tooltip" className='tooltip'/>
                {description.substr(0, 15)}...
            </p>

            <p className='event-card__description'>{dateFormatDbToViewEfetivo(eventDate)}</p>

            <a onClick={() => { conectar(idEvent) }} className="event-card__connect-link" href=''>Conectar</a>
        </article>
    );
};

export default NextEvent;