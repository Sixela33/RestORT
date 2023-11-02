import ServicioUsers from "../servicio-logica/ServicioUsers.js"
import Jwt from 'jsonwebtoken';
const { jwt } = Jwt;


class ControladorUsers {
    constructor() {
        this.servico = new ServicioUsers()
    }

    // crea un usuario normal, está hardcodeado que este va a ser un normie
    crearUsuario = async (req, res) => {
        try {
            let {nombre, contrasena, documento} = req.body
            await this.servico.crearUsuario(nombre, contrasena, documento, false, false)
            return res.status(201).send("Usuario creado exitosamente")
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    // Inicia la sesion de usuario
    iniciarSesion = async (req, res) => {
        try {
            const {documento, contrasena} = req.body
            const token = await this.servico.iniciarSesion(documento, contrasena)

            if (token) {
                // Enviamos el token de autenticacion al frontend
                return res.status(200).json({ token: token })
            }
            return res.status(401).json("Datos de sesion invalidos")

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    hacerAdmin = async (req, res) => {}

    quitarAdmin = async (req, res) => {}

    // prueba
    getUsuarios = async (req, res) => {
        const users = await this.servico.getUsuarios()
        res.json(users)
    }
}

export default ControladorUsers