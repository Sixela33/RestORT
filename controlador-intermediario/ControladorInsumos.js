import ServicioInsumos from "../servicio-logica/ServicioInsumo.js"

class ControladorInsumos {
    constructor() {
        this.servicio = new ServicioInsumos()

    }

    crearInsumo = async (req, res) => {
        try {
           await this.servicio.crearInsumo(req)
           res.status(201)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }
    
    traerInsumos = async (req, res) => {
        try {
            const data =  await this.servicio.traerInsumos(req)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    eliminarInsumo = async (req, res) => {
        try {
           await this.servicio.eliminarInsumo(req)
           res.status(201)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    modificarInsumoNombre = async (req, res) => {
        try {
            req[id] = id
            req[nombre] = nombre
           await this.servicio.modificarInsumoNombre(id, nombre)
           res.status(201)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    modificarInsumoCantidad = async (req, res) => {
        try {
            req[id] = id
            req[cantidad] = cantidad
           await this.servicio.modificarInsumoCantidad(id, cantidad)
           res.status(201)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    modificarInsumoCostoUnidad = async (req, res) => {
        try {
            req[id] = id
            req[costo] = costo
           await this.servicio.modificarInsumoCostoUnidad(id, costo)
           res.status(201)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    modificarInsumoUnidadMedida = async (req, res) => {
        try {
            req[id] = id
            req[unidad] = unidad
           await this.servicio.modificarInsumoUnidadMedida(id, unidad)
           res.status(201)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }
}

export default ControladorInsumos