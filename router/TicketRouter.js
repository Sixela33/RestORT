import express from 'express'
import {validarToken} from '../middlewares/middlewares.js'
import ControladorTickets from '../controlador-intermediario/ControladorTickets.js'

class TicketsRouter {
    constructor() {
        this.controlador = new ControladorTickets()
        this.router = express.Router()
    }

    start() {
        // this.router.get('/:id', validarToken, this.controlador.getPlatillos)
        this.router.post('/crear', validarToken, this.controlador.crearTicket)
        this.router.get('/busacrDia/:fecha1', validarToken, this.controlador.obtenerTicketsXFecha)
        this.router.get('/busacrFranja/:fecha1/:fecha2?', validarToken, this.controlador.obtenerTicketsXRangoFecha)
        
        return this.router
    }
}

export default TicketsRouter