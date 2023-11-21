import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js";
import { validarCreacionDePlatillo, validacionInsumosCreacionPlatillo } from "./validaciones/validacionesPlatillo.js";

class ServicioPlatillos {
    constructor() {
        this.model = new ModeloPostgres();
    }

    crearPlatillo = async ({insumos, nombre, valor}) => {

        for(insumo in insumos) {
            const result = validacionInsumosCreacionPlatillo(insumo);

            if (!result.result) {
                throw { message: result.error, status: 422 };
            }
        }

        const result = validarCreacionDePlatillo({nombre, valor});

        if (!result.result) {
            throw { message: result.error, status: 422 };
        }

        await this.model.crearPlatillo(insumos, nombre, valor)
    }

    buscarPlatillo = async ( {id} ) => {
        
        const result = validarBuscarPlatillo({id});

        if (!result.result) {
            throw { message: result.error, status: 422 };
        }
        
        const resultado = await this.model.getPlatilos(id)
        return resultado
    }
}

export default ServicioPlatillos