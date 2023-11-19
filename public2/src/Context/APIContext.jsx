// En apiContext.js
import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [clave, setClave] = useState(null);
  const [user, setUser] = useState(null);

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
      const decoded = jwtDecode(response.token);
      console.log(decoded);
      setUser(decoded);
    } else {
      console.error("Inicio de sesión fallido");
    }
  };

  const logout = () => {
    setClave("");
    setUser(null);
  };

  const cargarInsumos = async () => {
    const url = "/api/insumos";
    let data = await fetchData(url);
    console.log(data);
    return data;
  };

  const agregarInsumo = async (valores) => {
    let resultado;
    const url = "/api/insumos";
    let data = await fetchData(url, "POST", valores);
    console.log(data)
    data.ok ? (resultado = true) : (resultado = false);
    return resultado;
  };
  
  return (
    <ApiContext.Provider
      value={{
        fetchData,
        logout,
        login,
        user,
        cargarInsumos,
        agregarInsumo,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Un hook personalizado para acceder al contexto del carrito en cualquier componente
export const useApi = () => {
  return useContext(ApiContext);
};
