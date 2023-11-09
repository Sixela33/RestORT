import ModeloPostgres from "../modelo-db/DAO/ModeloPostgres.js";
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

class ServicioUsers {
    constructor() {
        this.model = new ModeloPostgres()
    }

    // prueba
    getUsuarios = async () => {
        const usuarios = this.model.getUsuarios()
        return usuarios
    }

    crearUsuario = async ({nombre, contrasena, documento, esAdmin, esSuperUser}) => {
        if (!nombre || !contrasena || !documento) throw "Datos invalidos"
        if(esAdmin == null) esAdmin = false
        if(esSuperUser == null) esSuperUser = false
 
        const usuarioExistente = await this.model.getUsuarioXdocumento(documento)

        if (usuarioExistente){
            throw "Este usuario ya existe" 
        }

        const contrasenaHash = await bcrypt.hash(contrasena, 10)
        const usuario = await this.model.crearUsuario(documento, nombre, contrasenaHash, esAdmin, esSuperUser)

        return usuario
    }

    iniciarSesion = async ({documento, contrasena}) => {

        if (!documento || !contrasena) return

        const usuario = await this.model.getUsuarioXdocumento(documento)

        if (usuario){
            const contraCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
            if (contraCorrecta){
                delete usuario.contrasena
                const token = await Jwt.sign(usuario, process.env.CLAVE_SECRETA);
                return token
            }
        }

        return
    }
    
    hacerAdmin = async () => {}
}

export default ServicioUsers