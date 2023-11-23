import Jwt from 'jsonwebtoken';

// valida que el token que este en el header sea valido, agrega a la llamada el camo "user" que tiene toda la info del mismo
function validarToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  try {
    const decoded = Jwt.verify(token, process.env.CLAVE_SECRETA)
    req.user = decoded
    
    next()
  } catch (error) {
      return res.status(401).json({ message: 'Token inválido' })
  }
}

function validarAdmin(req, res, next) {
  try {
    if (req.user.esadmin){
      next()
    }else {

      return res.status(401).json({ message: 'Necesitas ser aministrador para realizar esta accion' })
    }

  } catch (error) {
    return res.status(401).json({ message: 'Necesitas ser aministrador para realizar esta accion' })
  }
}

function validarSuperuser(req, res, next) {
  try {
    if (req.user.essuperuser){
      next()
    } else {

      return res.status(401).json({ message: 'Necesitas ser aministrador para realizar esta accion' })
    }

  } catch (error) {
    return res.status(401).json({ message: 'Necesitas ser aministrador para realizar esta accion' })
  }
}

export { validarToken, validarAdmin, validarSuperuser };