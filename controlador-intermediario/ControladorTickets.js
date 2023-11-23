import ServicioTickets from "../servicio-logica/ServicioTickets.js"

class ControladorTickets {
    constructor() {
        this.servicio = new ServicioTickets()
    }

    crearTicket = async (req, res) => {
        try {
            await this.servicio.crearTicket(req.body)
            return res.status(200).send()
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }

    organizarTickets = (resultado) => {
        const groupedByTicketId = {};

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

    obtenerTicketsXFecha = async (req, res) => {
        try {
            let resultado = await this.servicio.obtenerTicketsXFecha(req.body)
            resultado = this.organizarTickets(resultado)
            return res.status(200).json(resultado)
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }

    obtenerTicketsXRangoFecha = async (req, res) => {
        try {
            
            let resultado = await this.servicio.obtenerTicketsXRangoFecha(req.body)
            resultado = this.organizarTickets(resultado)
            return res.status(200).json(resultado)
        } catch (error) {
            return res.status(error.status).send(error.message)
        }
    }
}

export default ControladorTickets