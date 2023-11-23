import React from "react";
import "./TableE.css";

import editPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";

const TableTP = ({ dados, fnDelete = null, fnUpdate = null }) => {
  return (
    <table className="table-data">
      {/* cabecalho */}
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--little">
            Nome
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Descricao
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Tipo Evento
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Data
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>

      <tbody>
        {dados.map((e, i) => {
          return (
            <tr key={i} className="table-data__head-row">
              <td
                className="table-data__data table-data__data--big"
                idevento={e.idEvento}
              >
                {e.nomeEvento}
              </td>
              <td
                className="table-data__data table-data__data--big"
                idevento={e.idEvento}
              >
                {e.descricao}
              </td>

              <td
                className="table-data__data table-data__data--big"
                idevento={e.idEvento}
              >
                {e.tiposEvento.titulo}
              </td>

              <td
                className="table-data__data table-data__data--big"
                idevento={e.idEvento}
              >
                {new Date(e.dataEvento).toLocaleDateString()}
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={editPen}
                  alt=""
                  onClick={() => fnUpdate(e.idEvento)}
                />
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={trashDelete}
                  onClick={() => fnDelete(e.idEvento)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableTP;
