import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  validarUserCreacion,
  validarUserLogin,
} from "./validaciones/validacionesUser.js";

class ServicioUsers {
  constructor() {
    this.model = new ModeloPostgres();
  }

  // prueba
  getUsuarios = async ({ documento }) => {
    const usuarios = this.model.getUsuarios(documento);
    return usuarios;
  };

  crearUsuario = async ({nombre, contrasena, documento, esAdmin, esSuperUser}) => {
    
    const result = validarUserCreacion({nombre, contrasena, documento, esAdmin, esSuperUser});

    if (!result.result) {
      throw { message: result.error, status: 422 };
    }

    const usuarioExistente = await this.model.getUsuarioXdocumento(documento);

    if (usuarioExistente) {
      throw { message: "Este usuario ya existe", status: 409 };
    }

    const contrasenaHash = await bcrypt.hash(contrasena, 10);
    await this.model.crearUsuario(documento, nombre, contrasenaHash, esAdmin, esSuperUser);

    return {nombre, contrasena, documento, esAdmin, esSuperUser};
  };

  iniciarSesion = async ({ documento, contrasena }) => {
    const result = validarUserLogin({ documento, contrasena });
    
    if (!result.result) {
      throw { message: result.error, status: 422 };
    }

    const usuario = await this.model.getUsuarioXdocumento(documento);

    if (!usuario) {
      throw { message: "Datos de sesion invalidos", status: 401 };
    }

    const contraCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
    if (contraCorrecta) {
      delete usuario.contrasena;
      const token = await Jwt.sign(usuario, process.env.CLAVE_SECRETA);
      return token;
    } else {
      throw { message: "Datos de sesion invalidos", status: 401 };
    }

  };

  hacerAdmin = async ({ id }) => {
    
  };

  quitarAdmin = async ({ id }) => {

  };
}

export default ServicioUsers;
