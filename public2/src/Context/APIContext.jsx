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

      // Verificando si la solicitud fue exitosa (código de respuesta 200-299)
      if (!response.ok) {
        throw new Error(`Datos de sesion invalidos`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error al realizar ${method} request a ${url}`, error);
      throw error; // Propagando el error para que pueda ser manejado por el código que llama a fetchData
    }
  };

  const login = async (usuario) => {
    const url = "/api/users/login";

    const response = await fetchData(url, "POST", usuario);
    if (response.token) {
      setClave(response.token);
      const decoded = jwtDecode(response.token);
      console.log(decoded)
      setUser(decoded);
    } else {
      console.error("Inicio de sesión fallido");
    }
  }

  const signin = async (usuario) => {
    const url = "/api/users/register";

    try {
      const data = await fetchData(url, "POST", usuario);

      // // Verificando si el token está presente en la respuesta
      // if (data.token) {
      //   setClave(data.token);
      //   setIngresoPermitido(true);
      // }
    } catch (error) {
      // Manejando errores al realizar la solicitud
      console.error("Hubo un problema con la solicitud:", error);

      throw error;
    }
  };

  const logout = () => {
    setClave("");
    setUser(null);
  };

  return (
    <ApiContext.Provider
      value={{ fetchData, logout, login, user }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Un hook personalizado para acceder al contexto del carrito en cualquier componente
export const useApi = () => {
  return useContext(ApiContext);
};
