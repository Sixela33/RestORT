// En apiContext.js
import { createContext, useState, useContext } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [clave, setClave] = useState(null);
  const [ingresoPermitido, setIngresoPermitido] = useState(false);
  const fetchData = async (url, method = "GET", body = null) => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: clave,
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error al realizar ${method} request a ${url}`, error);
      throw error;
    }
  };

  const login = async (usuario) => {
    const url = "/api/users/login";
    const response = await fetchData(url, "POST", usuario);
    if (response.token) {
      setClave(response.token);
      setIngresoPermitido(true);
    } else {
      console.error("Inicio de sesión fallido");
    }
  };

  const logout = () => {
    setClave("");
    setIngresoPermitido(false);
  };

  return (
    <ApiContext.Provider
      value={{ fetchData, setClave, logout, login, ingresoPermitido }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Un hook personalizado para acceder al contexto del carrito en cualquier componente
export const useApi = () => {
  return useContext(ApiContext);
};
