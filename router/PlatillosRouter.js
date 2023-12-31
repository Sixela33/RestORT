import express from 'express'
import { validarToken, validarAdmin } from '../middlewares/middlewares.js'
import ControladorPlatillos from '../controlador-intermediario/ControladorPlatillos.js'


class PlatillosRouter {
    constructor() {
        this.controlador = new ControladorPlatillos()
        this.router = express.Router()
    }

    start() {
        this.router.get('/:id?', validarToken, this.controlador.getPlatillos)
        this.router.post('/', validarToken, validarAdmin, this.controlador.crearPlatillo)
        
        return this.router
    }
}

export default PlatillosRouter