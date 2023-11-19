import { Formik, Form, Field, ErrorMessage } from "formik";
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
        {({ errors }) => (
          <Form className="formulario">
            <label htmlFor="documento">Usuario</label>
            <Field
              type="text"
              name="documento"
              id="documento"
              placeholder="Username"
            />
            <ErrorMessage
              name="documento"
              component={() => <div className="error">{errors.documento}</div>}
            />

            <label htmlFor="contrasena">Password</label>
            <Field
              placeholder="Password"
              type="password"
              name="contrasena"
              id="contrasena"
            />
            <ErrorMessage
              name="contrasena"
              component={() => <div className="error">{errors.contrasena}</div>}
            />

            <button type="submit">Iniciar Sesion</button>
            {user && navigate("/")}
          </Form>

        )}
      </Formik>
    </>
  );
}

export default FormuLogin;
