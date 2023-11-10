import Joi from "joi";

const validarUserCreacion = user => {
    const userSchema = Joi.object({
        nombre: Joi.string().alpha().required().min(3).max(50),
        contrasena: Joi.string().alphanum().min(8).max(50),
        documento: Joi.string().alphanum().length(11),
        esAdmin: Joi.boolean().default(false),
        esSuperUser: Joi.boolean().default(false)
    })

    const { error } = userSchema.validate(user)
    if (error) {
        return {result: false, error: error.details[0].message}
    } 
    return {result: true}
} 

const validarUserLogin = user => {
    const userSchema = Joi.object({
        documento: Joi.string().alphanum().length(11), 
        contrasena: Joi.string().alphanum().min(8).max(50)
    })

    const { error } = userSchema.validate(user)
    if (error) {
        return {result: false, error: error.details[0].message}
    } 
    return {result: true}
}

export {
    validarUserCreacion,
    validarUserLogin
}