
import fs from 'fs';
import CnxPostgress from '../DBPostgres.js';

class ModeloPostgres {
 
    makeMigrations = async () => {
        try {
            if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
            const sql = fs.readFileSync('createTables.sql', 'utf8');
            await CnxPostgress.db.query(sql);
            const sql2 = fs.readFileSync('createProcedures.sql', 'utf8');
            await CnxPostgress.db.query(sql2);
            
            console.log("tuki")
        } catch (error) {
            console.error('Error al ejecutar las migraciones:', error);
        }
    }

    getUsuarios = async (documento) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        let res = []
        try {
            if (documento){
                console.log('1')
                res = await CnxPostgress.db.query("SELECT * FROM usuarios WHERE documento = $1;", [documento])
                console.log('1')
    
            } else {
                console.log('2')
                res = await CnxPostgress.db.query('SELECT * FROM usuarios')
                console.log('2')
            }
            
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        // En caso de error, envía una respuesta de error con el código 500 y un mensaje de error
            return { status: 500, error: 'Error interno del servidor' };
        }
        
        console.log(res)

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
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        CnxPostgress.db.query("INSERT INTO insumos (nombre, cantidad, costoXunidad, unidadDeMedida) VALUES ($1, $2, $3, $4);",
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

    editarInsumoxID = async (id, nombre, cantidad, costoXunidad, unidadDeMedida) => {
        if (!CnxPostgress.connection) throw new Error("No se estableció la conexión con la base de datos");

        const existeInsumo = await CnxPostgress.db.query("SELECT * FROM insumos WHERE insumoID = $1;", [id]);

        if (existeInsumo.rows.length === 0) {
            throw { message: "No se encontró el insumo con el ID proporcionado", status: 404 }
        }

        const resultado = await CnxPostgress.db.query(
            "UPDATE insumos SET nombre = $2, cantidad = $3, costoXunidad = $4, unidadDeMedida = $5 WHERE insumoID = $1 RETURNING *;",
            [id, nombre, cantidad, costoXunidad, unidadDeMedida]
        );

        return resultado.rows[0]
    }

    crearPlatillo = async (insumos, nombre, valor) => {
        if (!CnxPostgress.connection) throw new Error("No se estableció la conexión con la base de datos");
        
        const ingredientes = insumos.map(par => par[0]);
        const cantidad = insumos.map(par => par[1]);

        await CnxPostgress.db.query(
            'CALL AgregarIngredientesAlMenu($1, $2, $3, $4)',
            [nombre,valor, ingredientes, cantidad]
        )
    }

    getPlatilos = async (id) => {
        if (!CnxPostgress.connection) throw new Error("No se estableció la conexión con la base de datos");

        if (id) {
            res = await CnxPostgress.db.query("SELECT * FROM platillos WHERE platilloID = $1;", [id])
        } else {
            res = await CnxPostgress.db.query("SELECT * FROM platillos;")
        }

        return resultado.rows
    }

    crearTicket = async (platillos) => {

        const platillo = platillos.map(par => par[0]);
        const cantidad = platillos.map(par => par[1]);

        await CnxPostgress.db.query(
            'CALL crearTicket($1, $2)',
            [platillo, cantidad]
        )
    }
}

export default ModeloPostgres