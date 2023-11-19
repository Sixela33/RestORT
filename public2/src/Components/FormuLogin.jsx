import { Formik } from "formik";
import { useApi } from "../Context/APIContext";
import { useNavigate } from "react-router-dom";

function FormuLogin() {
  const { user, login } = useApi();
  const navigate = useNavigate();

  const loguear = async (valores, { resetForm }) => {
    login(valores);
    resetForm();
  };

  const hacerValidaciones = (valores) => {
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
  };

  return (
    <>
      <Formik
        initialValues={{
          documento: "",
          contrasena: "",
        }}
        validate={hacerValidaciones}
        onSubmit={loguear}
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
            {user && navigate("/")}
          </form>
        )}
      </Formik>
    </>
  );
}

export default FormuLogin;
