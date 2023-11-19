import { Formik, Form, Field, ErrorMessage } from "formik";
import { useApi } from "../Context/APIContext";
import { useState } from "react";

function FormuAgregarIngrediente() {
  const { agregarInsumo } = useApi();
  const [insumoCreado, setInsumoCreado] = useState(false);

  const agregarIngrediente = async (valores, { resetForm }) => {
    agregarInsumo(valores);
    setInsumoCreado(true);
    setTimeout(() => setInsumoCreado(false), 3000);
    resetForm();
  };

  const hacerValidaciones = (valores) => {
    let errores = {};

    if (!valores.cantidad) {
      errores.cantidad = "Debes ingresar una cantidad";
    }
    if (!valores.nombre) {
      errores.nombre = "Debes ingresar un nombre";
    }
    if (!valores.costoXunidad) {
      errores.costoXunidad = "Debes ingresar un costo";
    }
    if (!valores.unidadDeMedida) {
      errores.unidadDeMedida = "Debes ingresar una unidad de medida";
    }
    return errores;
  };

  return (
    <>
      <Formik
        initialValues={{
          nombre: "",
          cantidad: "",
          costoXunidad: "",
          unidadDeMedida: "",
        }}
        validate={hacerValidaciones}
        onSubmit={agregarIngrediente}
      >
        {({ errors }) => (
          <Form className="formulario">
            <label htmlFor="nombre">Nombre</label>
            <Field type="text" name="nombre" id="nombre" placeholder="Nombre" />
            <ErrorMessage
              name="nombre"
              component={() => <div className="error">{errors.nombre}</div>}
            />

            <label htmlFor="cantidad">Cantidad</label>
            <Field
              type="text"
              name="cantidad"
              id="cantidad"
              placeholder="Cantidad"
            />
            <ErrorMessage
              name="cantidad"
              component={() => <div className="error">{errors.cantidad}</div>}
            />

            <label htmlFor="costoXunidad">Costo</label>
            <Field
              placeholder="Costo"
              type="text"
              name="costoXunidad"
              id="costoXunidad"
            />
            <ErrorMessage
              name="costoXunidad"
              component={() => (
                <div className="error">{errors.costoXunidad}</div>
              )}
            />

            <label htmlFor="unidadDeMedida">Unidad de medida</label>
            <Field
              placeholder="Unidad de medida"
              type="text"
              name="unidadDeMedida"
              id="unidadDeMedida"
            />
            <ErrorMessage
              name="unidadDeMedida"
              component={() => (
                <div className="error">{errors.unidadDeMedida}</div>
              )}
            />

            <button type="submit">Agregar</button>
            {insumoCreado && (
              <p className="exito">Usuario creado con exito! </p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormuAgregarIngrediente;
