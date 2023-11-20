import ServicioUsers from "../servicio-logica/ServicioUsers.js"

class ControladorUsers {
    constructor() {
        this.servico = new ServicioUsers()
    }

    // crea un usuario
    crearUsuario = async (req, res) => {
        try {
            await this.servico.crearUsuario(req.body)
            return res.status(201).send("Usuario creado exitosamente")
            
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

    hacerAdmin = async (req, res) => {}

    quitarAdmin = async (req, res) => {}

    // prueba
    getUsuarios = async (req, res) => {
        try {
            const users = await this.servico.getUsuarios(req.body)
            res.json(users)
            
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }
}

export default ControladorUsers