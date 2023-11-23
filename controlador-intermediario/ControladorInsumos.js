import ServicioInsumos from "../servicio-logica/ServicioInsumo.js"

class ControladorInsumos {
    constructor() {
        this.servicio = new ServicioInsumos()
    }

    crearInsumo = async (req, res) => {
        try {
           await this.servicio.crearInsumo(req.body)
           return res.status(201)
        } catch (error) {
            console.log(error)
            return res.status(error.status).send(error.message)
        }
    }
    
    traerInsumos = async (req, res) => {
        try {
            const data =  await this.servicio.traerInsumos(req.params)
            return res.status(200).send(data)
        } catch (error) {
            console.log(error)
            return res.status(error.status).send(error.message)
        }
    }

    editarInsumo = async (req, res) => {
        try {
            const insumoEditado = await this.servicio.editarInsumo(req.body)
        } catch (error) {
            console.log(error)
            return res.status(error.status).send(error.message)
        }
    }

    agregarStock = async (req, res) => {
        try {
            await this.servicio.agregarStock(req.body)
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }

    eliminarInsumo = async (req, res) => {
        try {
            await this.servicio.eliminarInsumo(req.body)
        } catch (error) {
            console.log(error)
            return res.status(error.status).send(error.message)
        }
    }
}

export default ControladorInsumos