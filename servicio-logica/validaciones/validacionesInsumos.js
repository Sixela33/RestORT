import Joi from "joi";

const validarCreacionDeInsumo = (insumo) => {
  const insumoSchema = Joi.object({
    nombre: Joi.string().required().min(1).max(50),
    cantidad: Joi.number().required(),
    costoXunidad: Joi.number().required(),
    unidaddemedida: Joi.string().default("KG"),
  });

  const { error } = insumoSchema.validate(insumo);
  if (error) {
    return { result: false, error: error.details[0].message };
  }
  return { result: true };
};

// valida por el parametro q le paso a la url
const validarBuscarInsumo = ( id ) => {
  const { error } = Joi.number().validate(id);
  
  if (error) {
    return { result: false, error: error.details[0].message };
  }

  return { result: true };
};

export { validarCreacionDeInsumo, validarBuscarInsumo };
