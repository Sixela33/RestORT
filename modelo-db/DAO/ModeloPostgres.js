
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

    crearInsumo = async (nombre, cantidad, costoXunidad, unidadDeMedida) => {
        console.log([nombre, cantidad, costoXunidad, unidadDeMedida])
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        CnxPostgress.db.query("INSERT INTO insumos nombre, cantidad, costoXunidad, unidadDeMedida) VALUES ($1, $2, $3, $4, $5);",
        [nombre, cantidad, costoXunidad, unidadDeMedida])
    }

    traerInsumos = async (id) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        let res = []
        if (id){
            res = await CnxPostgress.db.query("SELECT * FROM insumos WHERE insumoID = $1;", [id])
        } else {
            res = await CnxPostgress.db.query("SELECT * FROM insumos;")
        }
       
        return res.rows
    }

    modificarInsumoNombre = async (id, nombre) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        CnxPostgress.db.query("UPDATE insumos WHERE id = $1 SET nombre = $2 VALUES ($1, $2);",
        [id, nombre])
    }

    modificarInsumoCantidad = async (id, cantidad) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        CnxPostgress.db.query("UPDATE insumos WHERE id = $1 SET cantidad = $2) VALUES ($1, $2);",
        [id, cantidad])
    }

    modificarInsumoCostoUnidad = async (id, costoXunidad) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        CnxPostgress.db.query("UPDATE insumos WHERE id = $1 SET costoXunidad = $2) VALUES ($1, $2);",
        [id, costoXunidad])
    }

    modificarInsumoUnidadMedida = async (id, unidadDeMedida) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        CnxPostgress.db.query("UPDATE insumos WHERE id = $1 SET unidadDeMedida = $2) VALUES ($1, $2);",
        [id, unidadDeMedida])
    }

    eliminarInsumo = async (id) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        CnxPostgress.db.query("DELETE FROM insumos WHERE insumoID = $1",
        [id])
    // To be Discussed??
    }

    crearPlatillo = async (nombre, costo, insumos) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        CnxPostgress.db.query("INSERT INTO platillos nombre, costo, insumos) VALUES ($1, $2, $3);",
        [nombre, costo, insumos])
    }

}

export default ModeloPostgres