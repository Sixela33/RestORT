import express from 'express'
import ControladorUsers from '../controlador-intermediario/ControladorUsers.js'
import {validarToken} from '../middlewares/middlewares.js'

class UserRouter {
    constructor() {
        this.controlador = new ControladorUsers()
        this.router = express.Router()
    }

    start() {
        this.router.post('/register', validarToken,  this.controlador.crearUsuario)
        this.router.post('/login', this.controlador.iniciarSesion)
        
        // Endpoint de prueba
        this.router.get('/:documento?', this.controlador.getUsuarios)
        
        return this.router
    }
}

export default UserRouter