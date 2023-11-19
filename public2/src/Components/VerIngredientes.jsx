import React, { useEffect, useState } from "react";
import { useApi } from "../Context/APIContext";

export default function VerIngredientes() {
  const { cargarIngredientes } = useApi();
  const [ingredientes, setIngredientes] = useState(null);

  const mostrarIngredientes = async () => {
    try {
      const data = await cargarInsumos();
      console.log(data);
      setIngredientes(data);
    } catch (error) {
      // Manejar el error, si es necesario
      console.error("Error al cargar ingredientes:", error);
    }
  };

  useEffect(() => {
    mostrarIngredientes();
  }, []); // Este efecto se ejecutará una vez al montar el componente
  return <div>{console.log(ingredientes)}</div>;
}
