import React from 'react';
import "./TableTp.css";
import { dateFormatDbToViewEfetivo } from '../../../Utils/stringFunctions';

// Importando ícones
import edtiPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";

const TableTp = ({ dados, fnUpdate = null, fnDelete = null }) => {

    return (
        <table className='table-data'>
            {/* Cabeçalho */}
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">
                        Título
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Descrição
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Data
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Tipo Evento
                    </th>
                    <th className="table-data__head-title table-data__head-title--little">
                        Editar
                    </th>
                    <th className="table-data__head-title table-data__head-title--little">
                        Deletar
                    </th>
                </tr>
            </thead>

            {/* Corpo */}

            <tbody>
                {/* Iniciando javascript */}
                {dados.map((tp) => {
                    return (
                        <tr className="table-data__head-row" key={tp.idEvento}>
                            <td className="table-data__data table-data__data--big">
                                {tp.nomeEvento}
                            </td>
                            <td className="table-data__data table-data__data--big" >
                                {tp.descricao}
                            </td>
                            <td className="table-data__data table-data__data--big" >
                                {dateFormatDbToViewEfetivo(tp.dataEvento)}
                            </td>

                            <td className="table-data__data table-data__data--big">
                                {tp.tipoEvento.titulo}
                            </td>

                            <td
                                className="table-data__data table-data__data--little"

                                idevento={tp.idEvento}
                                //? Propriedades em um html devem conter o nome todo minúsculo. Se for em qualquer estilo 
                                //? Pascal ou Camel Case mostra um erro indicando o nome todo minúsculo
                                > 
                                
                                <img
                                    className="table-data__icon"
                                    src={edtiPen}
                                    alt="Ícone de pincel, aperte para editar o referente evento"
                                    onClick={() => {
                                        fnUpdate(tp)
                                    }}/>
                                    
                            </td>

                            <td
                                className="table-data__data table-data__data--little"
                                >

                                <img
                                    className="table-data__icon"
                                    src={trashDelete}
                                    alt="ícone de lixeira, aperte para excluir o evento"
                                    onClick={() => {
                                        fnDelete(tp.idEvento)
                                    }}
                                />

                            </td>
                        </tr>
                    );
                })}

            </tbody>
        </table>
    );

};

export default TableTp;