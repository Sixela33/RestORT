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
}

export default ControladorInsumos