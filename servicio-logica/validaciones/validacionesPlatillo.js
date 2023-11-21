import Joi from "joi";

const validacionInsumosCreacionPlatillo = () => {
    const insumoSchema = Joi.object({
        insumoID: Joi.number().required(),
        cantidad: Joi.number().required(),
    })

    const { error } = platilloSchema.validate(platillo);
    if (error) {
        return { result: false, error: error.details[0].message };
    }
    return { result: true };
}

const validarCreacionDePlatillo = (platillo) => {

  const platilloSchema = Joi.object({
    nombre: Joi.number().required(),
    valor: Joi.number().required(),
  })

  const { error } = platilloSchema.validate(platillo);
  if (error) {
    return { result: false, error: error.details[0].message };
  }
  return { result: true };
};

const validarBuscarPlatillo = (id) => {
  const PlatilloSchema = Joi.object({
    id: Joi.number(),
  });

  const { error } = PlatilloSchema.validate(id);
  if (error) {
    return { result: false, error: error.details[0].message };
  }
  return { result: true };
};

export { validacionInsumosCreacionPlatillo, validarCreacionDePlatillo, validarBuscarPlatillo };
