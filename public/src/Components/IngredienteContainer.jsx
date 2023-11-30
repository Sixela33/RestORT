import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useApi } from "../Context/APIContext";
import { Link } from "react-router-dom";

export default function IngredienteContainer() {
  const { fetchData } = useApi();
  const [ingredientes, setIngredientes] = useState([]);
  const [cambio, setCambio] = useState(false)
  const { Column } = Table;
 
  const obtenerIngredientes = async () => {
    try {
      let res = await fetchData("/api/insumos");
      console.log(res)
      setIngredientes(res);
    } catch (error) {
      // Manejar el error, si es necesario
      console.error("Error al cargar ingredientes:", error);
    }
  };

  useEffect(() => {
    obtenerIngredientes();
  }, [cambio]);

  const currencyFormat = (num) => {
    return Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(num);
  };


  const handleEliminar = async (id) => {
    try{
      const url = `/api/insumos/${id}`;
      const response = await fetchData(url, "DELETE");

    } catch (error) {
      console.error(`Error al realizar delete request a /api/insumos`, error);
      throw error;
    }
    setCambio(!cambio);
  };

  return (
    <>
      <Table
        dataSource={ingredientes}
        className="tablaInsumos"
        size="large"
      >
        <Column align="center" title="Nombre" dataIndex="nombre" key="nombre" />
        <Column
          align="center"
          title="Cantidad"
          dataIndex="cantidad"
          key="cantidad"
        />
        <Column
          align="center"
          title="Unidad de Medida"
          dataIndex="unidaddemedida"
          key="unidaddemedida"
        />
        <Column
          align="center"
          title="Costo x Unidad"
          dataIndex="costoxunidad"
          key="costoxunidad"
          render={(text, record) => currencyFormat(record.costoxunidad)}
        />
        <Column
          align="center"
          title="Acciones"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/editarIngrediente/${record.insumoid}`}>Editar</Link>
              <a onClick={() => handleEliminar(record.insumoid)}>Eliminar</a>
            </Space>
          )}
        />
      </Table>
    </>
  );
}
