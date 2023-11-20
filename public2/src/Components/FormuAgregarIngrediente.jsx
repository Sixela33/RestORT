import { Formik, Form, Field, ErrorMessage } from "formik";
import { useApi } from "../Context/APIContext";
import { useState } from "react";

function FormuAgregarIngrediente() {
  const { agregarInsumo } = useApi();
  const [insumoCreado, setInsumoCreado] = useState(false);

  const agregarIngrediente = async (valores, { resetForm }) => {
    try {
      // Convertir valores a números antes de enviar al backend
      const valoresValidos = {
        ...valores,
        cantidad: parseFloat(valores.cantidad),
        costoXunidad: parseFloat(valores.costoXunidad),
      };
      // Enviar los datos al backend
      const resultado = await agregarInsumo(valoresValidos);
      console.log(resultado);
      // Mostrar mensaje de éxito y resetear el formulario solo si la operación fue exitosa
      if (resultado) {
        setInsumoCreado(true);
        setTimeout(() => setInsumoCreado(false), 3000);
        resetForm();
      }
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error("Error al agregar insumo:", error);
    }
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
          cantidad: 0,
          costoXunidad: 0,
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
              type="number"
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
              type="number"
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
            <Field as="select" name="unidadDeMedida" id="unidadDeMedida">
              <option value="" selected disabled>
                Seleccione una opcion
              </option>
              <option value="KG">KG</option>
              <option value="GR">GR</option>
              <option value="L">L</option>
              <option value="ML">ML</option>
            </Field>
            <ErrorMessage
              name="unidadDeMedida"
              component={() => (
                <div className="error">{errors.unidadDeMedida}</div>
              )}
            />

            <button type="submit">Agregar</button>
            {insumoCreado && <p className="exito">Insumo creado con exito! </p>}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormuAgregarIngrediente;
