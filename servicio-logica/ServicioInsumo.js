import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js";
import {
  validarCreacionDeInsumo,
  validarBuscarInsumo,
} from "./validaciones/validacionesInsumos.js";

class ServicioInsumos {
  constructor() {
    this.model = new ModeloPostgres();
  }

  crearInsumo = async ({ nombre, cantidad, costoXunidad, unidadDeMedida }) => {
    console.log({ nombre, cantidad, costoXunidad, unidadDeMedida })
    const result = validarCreacionDeInsumo({ nombre, cantidad, costoXunidad, unidadDeMedida });

    if (!result.result) {
      throw { message: result.error, status: 422 };
    }

    await this.model.crearInsumo(nombre, cantidad, costoXunidad, unidadDeMedida);
  }

  traerInsumos = async ({ id }) => {
    const result = validarBuscarInsumo({ id });

    if (!result.result) {
      throw { message: result.error, status: 422 };
    }
    return await this.model.traerInsumos(id);
  }

  editarInsumo = async ({id, nombre, cantidad, costoXunidad, unidadDeMedida}) => {
    const result = validarCreacionDeInsumo({ nombre, cantidad, costoXunidad, unidadDeMedida });

    if (!result.result) {
      throw { message: result.error, status: 422 };
    }

    return await this.model.editarInsumoxID( id, nombre, cantidad, costoXunidad, unidadDeMedida );
  }

  agregarStock = async ({id, cantidad}) => {
    const insumo = await this.traerInsumos({id}) 
    insumo.cantidad += cantidad
    
    return await this.editarInsumo(insumo)
  }

  eliminarInsumo = async ({id}) => {
    const result = validarBuscarInsumo({ id })

    if (!result.result) {
      throw { message: result.error, status: 422 };
    }

    return await this.model.eliminarInsumo(id)
  }
}

export default ServicioInsumos;
