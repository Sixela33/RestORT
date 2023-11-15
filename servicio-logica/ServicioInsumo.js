import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js"
import { validarCreacionDeInsumo, validarBuscarInsumo } from "./validaciones/validacionesInsumos.js"

class ServicioInsumos {
    constructor() {
        this.model = new ModeloPostgres()
    }

    crearInsumo = async  ({nombre, cantidad, costoXunidad, unidadDeMedida}) => {
        const result = validarCreacionDeInsumo({nombre, cantidad, costoXunidad, unidadDeMedida})
        
        if (!result.result){
            throw { message: result.error, status: 422 }
        }

        await this.model.crearInsumo(nombre, cantidad, costoXunidad, unidadDeMedida)
    }

    traerInsumos = async ({id}) => {
        const result = validarBuscarInsumo({id})
        
        if (!result.result){
            throw { message: result.error, status: 422 }
        }
        return await this.model.traerInsumos(id)
    }

    eliminarInsumo = async  ({id}) => {
        const result = validarEliminarInsumo({id})
        
        if (!result.result){
            throw { message: result.error, status: 422 }
        }

        await this.model.eliminarInsumo(id)
    }

    modificarInsumoNombre = async  ({id}, {nombre}) => {
        const result = validarModificarInsumo({id})
        
        if (!result.result){
            throw { message: result.error, status: 422 }
        }

        await this.model.modificarInsumoNombre(id, nombre)
    }

    modificarInsumoCantidad = async  ({id}, {cantidad}) => {
        const result = validarModificarInsumo({id})
        
        if (!result.result){
            throw { message: result.error, status: 422 }
        }

        await this.model.modificarInsumoCantidad(id, cantidad)
    }

    modificarInsumoCostoUnidad = async  ({id}, {costo}) => {
        const result = validarModificarInsumo({id})
        
        if (!result.result){
            throw { message: result.error, status: 422 }
        }

        await this.model.modificarInsumoCostoUnidad(id, costo)
    }

    modificarInsumoUnidadMedida = async  ({id}, {unidad}) => {
        const result = validarModificarInsumo({id})
        
        if (!result.result){
            throw { message: result.error, status: 422 }
        }

        await this.model.modificarInsumoUnidadMedida(id, unidad)
    }
    

}

export default ServicioInsumos