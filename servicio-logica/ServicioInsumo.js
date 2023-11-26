import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js";
import {
  validarCreacionDeInsumo,
  validarBuscarInsumo,
} from "./validaciones/validacionesInsumos.js";

class ServicioInsumos {
  constructor() {
    this.model = new ModeloPostgres();
  }

  crearInsumo = async ({ nombre, cantidad, costoXunidad, unidaddemedida }) => {
    const result = validarCreacionDeInsumo({
      nombre,
      cantidad,
      costoXunidad,
      unidaddemedida,
    });

    if (!result.result) {
      throw { message: result.error, status: 422 };
    }

    await this.model.crearInsumo(
      nombre,
      cantidad,
      costoXunidad,
      unidaddemedida
    );
  };

  traerInsumos = async (id) => {
    const result = validarBuscarInsumo( id);

    if (!result.result) {
      throw { message: result.error, status: 422 };
    }
    return await this.model.traerInsumos(id);
  };

  editarInsumo = async (id, insumo) => {
    const result = validarCreacionDeInsumo(insumo);

    if (!result.result) {
      throw { message: result.error, status: 422 };
    }

    return await this.model.editarInsumoxID(id, insumo
    );
  };

  agregarStock = async ({ id, cantidad }) => {
    const insumo = await this.traerInsumos({ id });
    insumo.cantidad += cantidad;

    return await this.editarInsumo(insumo);
  };

  eliminarInsumo = async (id) => {
    const result = validarBuscarInsumo(id);

    if (!result.result) {
      throw { message: result.error, status: 422 };
    }
    return await this.model.eliminarInsumo(id);
  };
}

export default ServicioInsumos;
