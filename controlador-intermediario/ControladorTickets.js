import ServicioTickets from "../servicio-logica/ServicioTickets.js"

class ControladorTickets {
    constructor() {
        this.servicio = new ServicioTickets()
    }

    crearTicket = async (req, res) => {
        try {
            await this.servicio.crearTicket(req.body)
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }
}

export default ControladorTickets