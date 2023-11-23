import express from 'express'
import { validarToken, validarAdmin } from '../middlewares/middlewares.js'
import ControladorInsumos from '../controlador-intermediario/ControladorInsumos.js'

class InsumosRouter {
    constructor() {
        this.controlador = new ControladorInsumos()
        this.router = express.Router()
    }

    start() {
        this.router.get('/:id?', validarToken, this.controlador.traerInsumos)
        this.router.post('/', validarToken, validarAdmin, this.controlador.crearInsumo)
        this.router.patch('/', validarToken, validarAdmin, this.controlador.editarInsumo)
        this.router.delete('/', validarToken, validarAdmin, this.controlador.eliminarInsumo)

        return this.router
    }
}

export default InsumosRouter