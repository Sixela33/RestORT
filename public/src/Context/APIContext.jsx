// En apiContext.js
import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [clave, setClave] = useState(null);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);

  // const fetchData = async (url, method = "GET", body = null) => {
  //   try {
  //     const options = {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: clave,
  //       },
  //       body: body ? JSON.stringify(body) : null,
  //     };

  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error(`Error al realizar ${method} request a ${url}`, error);
  //     throw error;
  //   }
  // };

  const fetchData = async (url, method = "GET", body = null) => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: clave,
        },
        data: body ? JSON.stringify(body) : null,
      };
      const response = await axios(url, options);
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error al realizar ${method} request a ${url}`, error);
      return error;
    }
  };

  const login = async (usuario) => {
    const url = "/api/users/login";
    const response = await fetchData(url, "POST", usuario);
    if (response.token) {
      setClave(response.token);
      const decoded = jwtDecode(response.token);
      setUser(decoded);
    } else {
      setLoginError("Inicio de sesión fallido");
    }
  };

  const logout = () => {
    setClave("");
    setUser(null);
  };

  const cargarInsumos = async () => {
    const url = "/api/insumos/";
    let data = await fetchData(url);
    console.log(data);
    return data;
  };

  const agregarInsumo = async (nuevoInsumo) => {
    try {
      const url = "/api/insumos/";
      let data = await fetchData(url, "POST", nuevoInsumo);
      return data.status === 200;
    } catch (error) {
      console.error("Error al agregar insumo:", error);
      return false;
    }
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
        loginError,
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
