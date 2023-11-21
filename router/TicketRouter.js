import express from 'express'
import validarToken from '../middlewares/middlewares.js'
import ControladorTickets from '../controlador-intermediario/ControladorTickets.js'

class TicketsRouter {
    constructor() {
        this.controlador = new ControladorTickets()
        this.router = express.Router()
    }

    start() {
        // this.router.get('/:id', validarToken, this.controlador.getPlatillos)
        this.router.post('/', validarToken, this.controlador.crearTicket)
        
        return this.router
    }
}

export default TicketsRouter