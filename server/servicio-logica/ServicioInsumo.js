import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js"

class ServicioInsumos {
    constructor() {
        this.model = new ModeloPostgres()
    }

    crearInsumo = async  ({nombre, cantidad, costoXunidad, unidadDeMedida}) => {
        if (!nombre || !cantidad || !costoXunidad || !unidadDeMedida) throw "Datos invalidos"

        await this.model.crearInsumo(nombre, cantidad, costoXunidad, unidadDeMedida)
    }

    traerInsumos = async ({id}) => {
        return await this.model.traerInsumos(id)
    }
}

export default ServicioInsumos