import { Formik, Form, Field, ErrorMessage } from "formik";
import { useApi } from "../Context/APIContext";
import { useNavigate } from 'react-router-dom';

function FormuEditarInsumo( {insumo})  {

  const { fetchData } = useApi();
  const navigate = useNavigate();
  const {insumoid,costoxunidad, cantidad, nombre, unidaddemedida} = insumo;

  if (!nombre) {
    insumo = null
  }
  
  const actualizarInsumo= async (valores) => {
    const ingredienteActualizado = {
      ...valores,
      cantidad: parseFloat(valores.cantidad),
      costoXunidad: parseFloat(valores.costoXunidad),
    }

    try{
      const response = await fetchData(`/api/insumos/${insumoid}`, "PUT", ingredienteActualizado)
      //const response = await fetch(`/api/insumos/${insumoid}`, options);
      //const data = await response.json();
      //console.log(response)

      if (response.message == "Insumo editado correctamente"){
        navigate('/ingredientes');
      }
      } catch (error) {
        console.error(`Error al realizar put request a /api/insumos/${insumoid}`, error);
        throw error;
      }
    }

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
      {insumo && <Formik
              initialValues={{
                nombre: `${nombre}`,
                cantidad: `${cantidad}`,
                costoXunidad: `${costoxunidad}`,
                unidaddemedida: `${unidaddemedida}`,
              }}
        validate={hacerValidaciones}
        onSubmit={actualizarInsumo}
      >
      {({ errors }) => (
        <Form className="formulario" >
          <label htmlFor="nombre">Nombre</label>
          <Field type="text" name="nombre" id="nombre"/>
          <ErrorMessage name="nombre" component={() => <div className="error">{errors.nombre}</div>}
          />

          <label htmlFor="cantidad">Cantidad</label>
          <Field
            type="number"
            name="cantidad"
            id="cantidad"
          />
          <ErrorMessage
            name="cantidad"
            component={() => <div className="error">{errors.cantidad}</div>}
          />

          <label htmlFor="unidaddemedida">Unidad de medida</label>
          <Field as="select" name="unidaddemedida" id="unidaddemedida">
            <option value="" selected>
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

          <button type="submit">Actualizar</button>
          <button type="submit" onClick={()=>{navigate('/ingredientes')}}>Volver</button>
        </Form>
      )}
      </Formik>}
    </>
  );
}

export default FormuEditarInsumo;
