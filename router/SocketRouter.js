import express from 'express'
import {validarToken} from '../middlewares/middlewares.js'
import ControladorSocket from '../controlador-intermediario/ControladorSocket.js'

class SocketRouter {
    constructor() {
        this.controlador = new ControladorSocket()
        this.router = express.Router()
    }

    start() {

        this.router.get('/', this.controlador.conectar)
        
        return this.router
    }
}

export default SocketRouter