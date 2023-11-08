
import fs from 'fs';
import CnxPostgress from '../DBPostgres.js';

class ModeloPostgres {
 
    makeMigrations = async () => {
        try {
            if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
            const sql = fs.readFileSync('createTables.sql', 'utf8');
            await CnxPostgress.db.query(sql);
        } catch (error) {
            console.error('Error al ejecutar las migraciones:', error);
        }
    }

    getUsuarios = async () => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        const res = await CnxPostgress.db.query('SELECT * FROM usuarios')
        return res.rows
    }

    crearUsuario = async (documento, nombre, contrasena, esAdmin, esSuperUser) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        CnxPostgress.db.query("INSERT INTO usuarios (documento, nombre, contrasena, esAdmin, esSuperUser) VALUES ($1, $2, $3, $4, $5);",
        [documento, nombre, contrasena, esAdmin, esSuperUser])
        
    }

    getUsuarioXdocumento = async (documento) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        const res = await CnxPostgress.db.query("SELECT * FROM usuarios WHERE documento = $1;", [documento])
        return res.rows[0]
    }

}

export default ModeloPostgres