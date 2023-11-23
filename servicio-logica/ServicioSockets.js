import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js";

class ServicioSockets {
    constructor() {
        this.model = new ModeloPostgres();
        this.socketsConnected = new Set()
    }

    conectar = async (req) => {
        const io = req.io
        io.on('connection', (socket) => {
            console.log(socket.id)
            this.socketsConnected.add(socket.id)
       
            socket.on('disconnect', () => {
                this.socketsConnected.delete(socket.id)
            });

            socket.on('modificacion', objeto => {
                io.emit('update', objeto)   
            }) 
        })

        io.on('error', (error) => {
            console.error('Error en la conexión del socket:', error)

        })

    }

}

export default ServicioSockets