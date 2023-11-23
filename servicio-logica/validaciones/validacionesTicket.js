const validarTicketCreacion = ticket => {

    const TicketSchema = Joi.object({
        platillos: Joi.array().items(Joi.number().required())
    })
    
    const { error } = TicketSchema.validate(ticket)
    if (error) {
        return {result: false, error: error.details[0].message}
    } 
    return {result: true}
} 

const validacionBuscaTicket = fechas => {
    console.log(fechas)
    const fechaSchema = Joi.object({
        fecha1: Joi.string().required(),
        fecha2: Joi.string()
    })
  

    const { error } = fechaSchema.validate(fechas)
    if (error) {
        return {result: false, error: error.details[0].message}
    } 
    return {result: true}
}

export { validarTicketCreacion, validacionBuscaTicket }