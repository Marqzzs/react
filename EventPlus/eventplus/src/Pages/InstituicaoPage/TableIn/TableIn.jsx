import React from "react";
import "./TableIn.css"

// Importando ícones
import trashDelete from "../../../assets/images/trash-delete.svg";

const TableIn = ({ dados, fnDelete = null }) => {

    return (
        <table className="table-data">

            {/* Cabeçalho */}

            <thead className="table-data__head">

                <tr className="table-data__head-row">

                    <th className="table-data__head-title table-data__head-title--big">
                        Nome Fantasia
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        CNPJ
                    </th>
                    <th className="table-data__head-title table-data__head-title--big">
                        Endereço
                    </th>

                    <th className="table-data__head-title table-data__bead-title--little">
                        Deletar
                    </th>

                </tr>

            </thead>

            <tbody>
                {/* Começando Javascript */}
                {dados.map(z => {
                    return(
                        <tr className="table-data__head-row" key={z.idInstituicao}>

                            {/* Valores  */}
                            <td className="table-data__data table-data__data--little">
                                {z.nomeFantasia}
                            </td>

                            <td className="table-data__data table-data__data--big">
                                {z.cnpj}
                            </td>

                            <td className="table-data__data table-data__data--big">
                                {z.endereco}
                            </td>

                            <td className="table-data__data table-data__data--little">

                                <img
                                    className="table-data__icon"
                                    src={trashDelete}
                                    alt="ícone de lixeira, aperte para excluir o evento"
                                    onClick={() => {
                                        fnDelete(z.idInstituicao)
                                    }}
                                />

                            </td>

                        </tr>
                    )
                })}

            </tbody>

        </table>
    )
}

export default TableIn;