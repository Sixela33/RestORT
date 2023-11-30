import { Formik, Form, Field, ErrorMessage } from "formik";
import { useApi } from "../Context/APIContext";
import { useState } from "react";

function FormuAgregarIngrediente() {
  const { fetchData } = useApi();
  const [insumoCreado, setInsumoCreado] = useState(false);

  const agregarIngrediente = async (valores, { resetForm }) => {
    // Convertir valores a números antes de enviar al backend
    const valoresValidos = {
      ...valores,
      cantidad: parseFloat(valores.cantidad),
      costoXunidad: parseFloat(valores.costoXunidad),
    };
    // Enviar los datos al backend
    try {
      
      const url = "/api/insumos/";
      let data = await fetchData(url, "POST", valoresValidos);
    
      if (data) {
        setInsumoCreado(true);
        setTimeout(() => setInsumoCreado(false), 3000);
      }
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error("Error al agregar insumo:", error);
    } finally {
      resetForm();
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
    if (!valores.unidaddemedida) {
      errores.unidaddemedida = "Debes ingresar una unidad de medida";
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
          unidaddemedida: "",
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

            <label htmlFor="unidaddemedida">Unidad de medida</label>
            <Field as="select" name="unidaddemedida" id="unidaddemedida">
              <option value="" disabled>
                Seleccione una opcion
              </option>
              <option value="UNIDADES">UNIDADES</option>
              <option value="KG">KG</option>
              <option value="GR">GR</option>
              <option value="L">L</option>
              <option value="ML">ML</option>
            </Field>
            <ErrorMessage
              name="unidaddemedida"
              component={() => (
                <div className="error">{errors.unidaddemedida}</div>
              )}
            />

            <label htmlFor="costoXunidad">Costo unitario</label>
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

            <button type="submit">Agregar</button>
            {insumoCreado && <p className="exito">Insumo creado con exito! </p>}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormuAgregarIngrediente;
