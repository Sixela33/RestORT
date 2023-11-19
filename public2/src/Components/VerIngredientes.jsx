import React, { useEffect, useState } from "react";
import { useApi } from "../Context/APIContext";

export default function VerIngredientes() {
  const { fetchData } = useApi();
  const [ingredientes, setIngredientes] = useState(null);

  const mostrarIngredientes = async () => {
    try {
      console.log("yappity")
      const data = await fetchData('/api/insumos');
      const BORRARPARAUSAR = JSON.stringify(data)
      setIngredientes(BORRARPARAUSAR);
    } catch (error) {
      // Manejar el error, si es necesario
      console.error("Error al cargar ingredientes:", error);
    }
  };

  useEffect(() => {
    mostrarIngredientes();
  }, []); // Este efecto se ejecutará una vez al montar el componente
  return <div>{ingredientes}</div>;
}
