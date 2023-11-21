import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js";

class ServicioTickets {
    constructor() {
        this.model = new ModeloPostgres();
    }

    crearTicket = ({platillos}) => {
        /*
            Debe recibir un objeto de la siguiente forma: 

            {
                platillos: [idPlatillo: canditad, ...]
            }
        */
        this.model.crearTicket(platillos)
    }

}

export default ServicioTickets