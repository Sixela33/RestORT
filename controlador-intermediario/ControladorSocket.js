import ServicioSockets from "../servicio-logica/ServicioSockets.js"

class ControladorSocket {
    constructor() {
        this.servicio = new ServicioSockets()
    }

    conectar = async (req, res) => {
        
        await this.servicio.conectar(req)
        
        res.status(200).json({ mensaje: 'Conexión exitosa al servidor de sockets' });
    }



}

export default ControladorSocket