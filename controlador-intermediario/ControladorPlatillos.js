import ServicioPlatillos from "../servicio-logica/ServicioPlatillos.js"

class ControladorPlatillos {
    constructor() {
        this.servicio = new ServicioPlatillos()
    }

    getPlatillos = async (req, res) => {
        try {
            this.servicio.buscarPlatillo(req.params)
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }

    crearPlatillo = async (req, res) => {
        try {
            this.servicio.crearPlatillo(req.body)
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }
}

export default ControladorPlatillos