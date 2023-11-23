import React from "react";
import { useApi } from "../Context/APIContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { user } = useApi();
  // si no tiene el ingreso permitido va a ser redirigido a el login
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  // si tiene el ingreso permitido entonces va a poder navegar a al ruta que seleccione
  return <Outlet />;
};

export default ProtectedRoute;
