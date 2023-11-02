import express, { Router } from 'express'
import ControladorUsers from '../controlador-intermediario/ControladorUsers.js'

class UserRouter {
    constructor() {
        this.controlador = new ControladorUsers()
        this.router = express.Router()
    }

    start() {
        this.router.post('/register', this.controlador.crearUsuario)
        this.router.post('/login', this.controlador.iniciarSesion)
        this.router.get('/register')
        
        // Endpoint de prueba
        this.router.get('/', this.controlador.getUsuarios)
        
        return this.router
    }
}

export default UserRouter