import React from 'react';
import "./TableTp.css";

// Importando ícones
import edtiPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";

const TableTp = ({ dados, fnDelete = null, fnUpdate = null }) => {
    return (
        <table className='table-data'>
            {/* Cabeçalho */}
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">
                        Título
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

                {/* Iniciando JavaScript */}
                {dados.map((tp) => {
                    return (
                        <tr className="table-data__head-row">
                            <td className="table-data__data table-data__data--big">
                                {tp.titulo}
                            </td>

                            <td
                                className="table-data__data table-data__data--little"

                                idtipoevento={tp.idTipoEvento}
                                //? Propriedades em um html devem conter o nome todo minúsculo. Se for em qualquer estilo 
                                //? Pascal ou Camel Case mostra um erro indicando o nome todo minúsculo
                                > 
                                
                                <img
                                    className="table-data__icon"
                                    src={edtiPen}
                                    alt="Ícone de pincel, aperte para editar o referente tipo de evento"
                                    onClick={() => {
                                        fnUpdate(tp.idTipoEvento)
                                    }}/>
                                    
                            </td>

                            <td
                                className="table-data__data table-data__data--little"
                                >

                                <img
                                    className="table-data__icon"
                                    src={trashDelete}
                                    alt="ícone de lixeira, aperte para excluir o tipo de evento"
                                    onClick={() => {
                                        fnDelete(tp.idTipoEvento)
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