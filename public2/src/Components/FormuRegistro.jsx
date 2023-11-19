import { Formik, Form, Field, ErrorMessage } from "formik";
import { useApi } from "../Context/APIContext";
import { useNavigate } from "react-router-dom";

function FormuRegistro() {
  const { ingresoPermitido, signin } = useApi();
  const navigate = useNavigate();

  const registrarUsuario = async (valores, { resetForm }) => {
    signin(valores);
    resetForm();
  };

  const hacerValidaciones = (valores) => {
    let errores = {};

    if (!valores.documento) {
      errores.documento = "Debes ingresar un usuario";
    }
    //regex
    //  else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.usuario)) {
    //   errores.usuario = "El nombre solo puede contener letras";
    // }
    if (!valores.nombre) {
      errores.nombre = "Debes ingresar un nombre";
    }
    if (!valores.contrasena) {
      errores.contrasena = "Debes ingresar una password";
    }
    return errores;
  };

  return (
    <>
      <Formik
        initialValues={{
          nombre: "",
          documento: "",
          contrasena: "",
        }}
        validate={hacerValidaciones}
        onSubmit={registrarUsuario}
      >
        {({ errors }) => (
          <Form className="formulario">
            <label htmlFor="nombre">Nombre</label>
            <Field type="text" name="nombre" id="nombre" placeholder="Name" />
            <ErrorMessage
              name="nombre"
              component={() => <div className="error">{errors.nombre}</div>}
            />

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

            <button type="submit">Registrarse</button>
            {ingresoPermitido && navigate("/login")}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormuRegistro;
