import express, { Router } from 'express'
import validarToken from '../middlewares/middlewares.js'
import ControladorInsumos from '../controlador-intermediario/ControladorInsumos.js'

class InsumosRouter {
    constructor() {
        this.controlador = new ControladorInsumos()
        this.router = express.Router()
    }

    start() {
        this.router.get('/', validarToken,  this.controlador.traerInsumos)
        this.router.post('/', validarToken,  this.controlador.crearInsumo)
        this.router.delete('/', validarToken,  this.controlador.eliminarInsumo)
        this.router.put('/update_name', validarToken, this.controlador.modificarInsumoNombre)
        this.router.put('/update_qtt', validarToken, this.controlador.modificarInsumoCantidad)
        this.router.put('/update_unitcost', validarToken, this.controlador.modificarInsumoCostoUnidad)
        this.router.put('/update_unitmeasurement', validarToken, this.controlador.modificarInsumoUnidadMedida)

        return this.router
    }
}

export default InsumosRouter