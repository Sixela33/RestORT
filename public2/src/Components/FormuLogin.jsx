import { Formik } from "formik";
import React, { useState } from "react";
import { useApi } from "../Context/APIContext";

function FormuLogin() {
  const { fetchData, setClave } = useApi();
  const [ingresoPermitido, setIngresoPermitido] = useState(false);
  return (
    <>
      <Formik
        initialValues={{
          documento: "",
          contrasena: "",
        }}
        validate={(valores) => {
          let errores = {};

          if (!valores.documento) {
            errores.documento = "Debes ingresar un usuario";
          }
          //  else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.usuario)) {
          //   errores.usuario = "El nombre solo puede contener letras";
          // }

          if (!valores.contrasena) {
            errores.contrasena = "Debes ingresar una password";
          }
          return errores;
        }}
        onSubmit={async (valores, { resetForm }) => {
          console.log(valores);
          // lo que enviamos a la api/server
          const url = "/api/users/login";
          try {
            const response = await fetchData(url, "POST", valores);
            if (response.token) {
              // Si la respuesta es exitosa, puedes realizar acciones adicionales aquí
              setClave(response.token);
              console.log("Inicio de sesión exitoso");
              setIngresoPermitido(true);
            } else {
              // Si la respuesta no es exitosa, puedes manejar errores o mostrar un mensaje al usuario
              console.error("Inicio de sesión fallido");
            }
          } catch (error) {
            console.error("Error al realizar la solicitud:", error);
          }

          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <form
            action="/users/login"
            className="formulario"
            onSubmit={handleSubmit}
          >
            <label htmlFor="documento">Usuario</label>
            <input
              type="text"
              name="documento"
              id="documento"
              placeholder="Username"
              value={values.documento}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.documento && errors.documento && (
              <div className="error">{errors.documento}</div>
            )}
            <label htmlFor="contrasena">Password</label>
            <input
              placeholder="Password"
              type="password"
              name="contrasena"
              id="contrasena"
              value={values.contrasena}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.contrasena && errors.contrasena && (
              <div className="error">{errors.contrasena}</div>
            )}
            <button type="submit">Iniciar Sesion</button>
            {ingresoPermitido && <p className="exito">Ingreso admitido</p>}
          </form>
        )}
      </Formik>
    </>
  );
}

export default FormuLogin;
