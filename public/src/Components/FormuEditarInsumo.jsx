// import { useApi } from '../Context/APIContext';
// import { useNavigate } from 'react-router-dom';

// function FormuEditarInsumo( {insumo}) {
//   const { setCambios,cambios, clave } = useApi();
//   const navigate = useNavigate();

// let insumoAactualizar = insumo

// const actualizarInsumo = async (e) => {

//   e.preventDefault();

//   // Validaciones
//   const newErrors = {};
//   if (!values.cantidad) {
//     newErrors.cantidad = 'Debes ingresar una cantidad';
//   }
//   if (!values.nombre) {
//     newErrors.nombre = 'Debes ingresar un nombre';
//   }
//   if (!values.costoxunidad) {
//     newErrors.costoxunidad = 'Debes ingresar un costo';
//   }
//   if (!values.unidaddemedida) {
//     newErrors.unidaddemedida = 'Debes seleccionar una unidad de medida';
//   }

//   if (Object.keys(newErrors).length > 0) {
//     setErrors(newErrors);
//     return;
//   }
//         try{
//           const options = {
//             method: "put",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: clave,
//          },
//         body: JSON.stringify(ingredienteActualizado),
//         };
//           const response = await fetch(`/api/insumos/${insumo.insumoid}`, options);
//           const data = await response.json();
//           console.log(data);
    

//         if (response.status == 200){
//         setCambios(cambios+1);
//         navigate('/ingredientes');

//       }
//     } catch (error) {
//       console.error(`Error al realizar put request a /api/insumos/${insumo.insumoid}`, error);
//       throw error;
//     }
//   }


//   return (
//     <>
//     <form onSubmit={actualizarInsumo} className='formulario'>
//       <label htmlFor="nombre">Nombre</label>
//       <input
//         type="text"
//         id="nombre"
//         name="nombre"
//         placeholder={insumoAactualizar.nombre}
//         value={insumoAactualizar.nombre}
//       />


//       <label htmlFor="cantidad">Cantidad</label>
//       <input
//         type="number"
//         id="cantidad"
//         name=""
//         placeholder={insumoAactualizar.cantidad}
//         value={insumoAactualizar.cantidad}

//       />


//       <label htmlFor="unidaddemedida">Unidad de medida</label>
//       <select
//         id="unidaddemedida"
//         name="unidaddemedida"
//       >
//         <option  disabled selected>
//         {insumoAactualizar.unidaddemedida}
//         </option>
//         <option value="UNIDADES">UNIDADES</option>
//         <option value="KG">KG</option>
//         <option value="GR">GR</option>
//         <option value="L">L</option>
//         <option value="ML">ML</option>
//       </select>


//       <label htmlFor="costoXunidad">Costo unitario</label>
//       <input
//         type="number"
//         id="costoxunidad"
//         name="costoxunidad"
//         placeholder={insumoAactualizar.costoxunidad}
//         value={insumoAactualizar.costoxunidad}
//       />

//       <button type="submit" >Actualizar</button>
//       <button type="submit" onClick={()=>{navigate('/ingredientes')}}>Volver</button>
//     </form>
    
//     </>
//   );
// }

// export default FormuEditarInsumo;



import { Formik, Form, Field, ErrorMessage } from "formik";
import { useApi } from "../Context/APIContext";
import { useNavigate } from 'react-router-dom';

function FormuEditarInsumo( {insumo})  {
  const { setCambios,cambios, clave } = useApi();
  const navigate = useNavigate();
const {insumoid,costoxunidad, cantidad, nombre, unidaddemedida} = insumo;

 const actualizarInsumo= async (valores) => {
  const ingredienteActualizado = {
    ...valores,
    cantidad: parseFloat(valores.cantidad),
    costoXunidad: parseFloat(valores.costoXunidad),
  }
  try{
      const options = {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: clave,
             },
            body: JSON.stringify(ingredienteActualizado),
            };
              const response = await fetch(`/api/insumos/${insumoid}`, options);
              const data = await response.json();
        
    
            if (response.status == 200){
            setCambios(cambios+1);
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
      <Formik
              initialValues={{
                nombre: "",
                cantidad: "",
                costoXunidad: "",
                unidaddemedida: "",
              }}
        validate={hacerValidaciones}
        onSubmit={actualizarInsumo}
      >
        {({ errors }) => (
          <Form className="formulario" >
            <label htmlFor="nombre">Nombre</label>
            <Field type="text" name="nombre" id="nombre" placeholder={`${nombre}`} />
            <ErrorMessage name="nombre" component={() => <div className="error">{errors.nombre}</div>}
            />

            <label htmlFor="cantidad">Cantidad</label>
            <Field
              type="number"
              name="cantidad"
              id="cantidad"
              placeholder={`${cantidad}`}
            />
            <ErrorMessage
              name="cantidad"
              component={() => <div className="error">{errors.cantidad}</div>}
            />

            <label htmlFor="unidaddemedida">Unidad de medida</label>
            <Field as="select" name="unidaddemedida" id="unidaddemedida">
              <option value="" selected disabled>
              {`${unidaddemedida}`}
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
              placeholder={`${costoxunidad}`}
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
      </Formik>
    </>
  );
}

export default FormuEditarInsumo;
