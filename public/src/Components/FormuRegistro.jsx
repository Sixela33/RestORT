import { Formik, Form, Field, ErrorMessage } from "formik";
import { useApi } from "../Context/APIContext";
import { useState } from "react";

function FormuRegistro() {
  const { fetchData } = useApi();
  const [usuarioCreado, setUsuarioCreado] = useState(false);

  const registrarUsuario = async (valores, { resetForm }) => {
    console.log(valores)
    const result = await fetchData('api/users/register', 'POST', valores)
    resetForm();
    setUsuarioCreado(true);
    setTimeout(() => setUsuarioCreado(false), 3000);
  };

  const hacerValidaciones = (valores) => {
    let errores = {};

    if (!valores.documento) {
      errores.documento = "Debes ingresar un usuario";
    }
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

            <label htmlFor="documento">documento</label>
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
            {usuarioCreado && (
              <p className="exito">Usuario creado con exito! </p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormuRegistro;
