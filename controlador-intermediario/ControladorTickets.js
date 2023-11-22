import ServicioTickets from "../servicio-logica/ServicioTickets.js"

class ControladorTickets {
    constructor() {
        this.servicio = new ServicioTickets()
    }

    crearTicket = async (req, res) => {
        try {
            await this.servicio.crearTicket(req.body)
            return res.status(200).send()
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }

    obtenerTicketsXFecha = async (req, res) => {
        try {
            const resultado = await this.servicio.obtenerTicketsXFecha(req.body)
            return res.status(200).json(resultado)
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }
}

export default ControladorTickets