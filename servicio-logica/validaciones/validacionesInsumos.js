import Joi from "joi";

const validarCreacionDeInsumo = insumo => {
    const insumoSchema = Joi.object({
        nombre: Joi.string().alpha().required().min(1).max(50), 
        cantidad: Joi.number().required(), 
        costoXunidad: Joi.number().required(),
        unidadDeMedida: Joi.string().alpha().default("KG")
    })

    const { error } = userSchema.validate(user)
    if (error) {
        return {result: false, error: error.details[0].message}
    } 
    return {result: true}
}

const validarBuscarInsumo = id => {
    const insumoSchema = Joi.object({
        id: Joi.number()
    })
    
    const { error } = userSchema.validate(user)
    if (error) {
        return {result: false, error: error.details[0].message}
    } 
    return {result: true}
}

export {
    validarCreacionDeInsumo,
    validarBuscarInsumo
    }