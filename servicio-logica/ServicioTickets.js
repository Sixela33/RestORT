import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js";
import { validarTicketCreacion, validacionBuscaTicket } from "./validaciones/validacionesTicket.js";

class ServicioTickets {
    constructor() {
        this.model = new ModeloPostgres();
    }

    crearTicket = async ({platillos}) => {
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

    organizarTickets = (resultado) => {
        const groupedByTicketId = {}

        resultado.forEach(fila => {
            const ticketId = fila[0];
        
            if (!groupedByTicketId[ticketId]) {
                groupedByTicketId[ticketId] = {
                    items: [],
                    costoTotal: 0
                };
            }
        
            groupedByTicketId[ticketId].items.push(fila);
            groupedByTicketId.costoTotal += fila.valor_total
        });

        console.log("==========================")
        console.log(groupedByTicketId)
        
        const groupedResult = Object.values(groupedByTicketId);
        return groupedResult
    }

    obtenerTicketsXFecha = async ({fecha1}) => {
        console.log(fecha1)
 
        const result = validacionBuscaTicket({fecha1, fecha1});

        if (!result.result) {
            throw { message: result.error, status: 422 };
        }
        
        console.log(fecha1)

        let resultado = this.model.obtenerTicketsXRangoFecha(fecha1, fecha1)
        resultado = this.organizarTickets(resultado)
        return resultado
    }

    obtenerTicketsXRangoFecha = async ({fecha1, fecha2}) => {
        const result = validacionBuscaTicket({fecha1, fecha2});

        if (!result.result) {
            throw { message: result.error, status: 422 };
        }

        let resultado = this.model.obtenerTicketsXRangoFecha(fecha1, fecha2)
        resultado = this.organizarTickets(resultado)
        return resultado
    }

}

export default ServicioTickets