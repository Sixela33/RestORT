// En apiContext.js
import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [clave, setClave] = useState(null);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);

  

  const fetchData = async (url, method = "GET", body = null) => {
    setUser({asdf:"asdf"})
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




  return (
    <ApiContext.Provider
      value={{
        fetchData,
        logout,
        login,
        user,
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
