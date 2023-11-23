import ServicioUsers from "../servicio-logica/ServicioUsers.js"

class ControladorUsers {
    constructor() {
        this.servico = new ServicioUsers()
    }

    // crea un usuario
    crearUsuario = async (req, res) => {
        try {
            const usuarioCreado = await this.servico.crearUsuario(req.body)
            return res.status(201).send(usuarioCreado)
            
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }

    // Inicia la sesion de usuario
    iniciarSesion = async (req, res) => {
        try {
            const token = await this.servico.iniciarSesion(req.body)

            if (token) {
                // Enviamos el token de autenticacion al frontend
                return res.status(200).json({ token: token })
            }
            return res.status(401).send("Datos de sesion invalidos")

        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }

    hacerAdmin = async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }

    quitarAdmin = async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(error.status).send(error.message)

        }
    }

    // prueba
    getUsuarios = async (req, res) => {
        try {
            const users = await this.servico.getUsuarios(req.params)
            res.json(users)
            
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }
}

export default ControladorUsers