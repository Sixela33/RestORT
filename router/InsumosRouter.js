import express from 'express'
import validarToken from '../middlewares/middlewares.js'
import ControladorInsumos from '../controlador-intermediario/ControladorInsumos.js'

class InsumosRouter {
    constructor() {
        this.controlador = new ControladorInsumos()
        this.router = express.Router()
    }

    start() {
        this.router.get('/:id', validarToken, this.controlador.traerInsumos)
        this.router.post('/', validarToken, this.controlador.crearInsumo)
        this.router.patch('/', validarToken, this.controlador.editarInsumo)

        return this.router
    }
}

export default InsumosRouter