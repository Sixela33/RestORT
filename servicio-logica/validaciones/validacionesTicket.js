const validarTicketCreacion = ticket => {

    const TicketSchema = Joi.object({
        platillos: Joi.array().items(Joi.number().required())
    })
    
    const { error } = userSchema.validate(ticket)
    if (error) {
        return {result: false, error: error.details[0].message}
    } 
    return {result: true}
} 

export { validarTicketCreacion }