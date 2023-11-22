import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js";
import { validarTicketCreacion } from "./validaciones/validacionesTicket.js";

class ServicioTickets {
    constructor() {
        this.model = new ModeloPostgres();
    }

    crearTicket = ({platillos}) => {
        /*
            {
                platillos: [idPlatillo: canditad, ...]
            }
        */

        const result = validarTicketCreacion({platillos});

        if (!result.result) {
            throw { message: result.error, status: 422 };
        }
        this.model.crearTicket(platillos)
    }

    obtenerTicketsXFecha = ({fecha}) => {

        const resultado = this.model.obtenerTicketsXFecha(fecha)
        return resultado
    }

}

export default ServicioTickets