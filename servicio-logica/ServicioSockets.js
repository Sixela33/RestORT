import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js";

class ServicioSockets {
    constructor() {
        this.model = new ModeloPostgres();
        this.socketsConnected = new Set()
    }

    conectar = async (req) => {
        io.on('connection', (socket) => {
            console.log(socket.id)
            this.socketsConnected.add(socket.id)
       
            socket.on('disconnect', () => {
                this.socketsConnected.delete(socket.id)
            });
        })

        io.on('error', (error) => {
            console.error('Error en la conexión del socket:', error);

        });

    }

}

export default ServicioSockets