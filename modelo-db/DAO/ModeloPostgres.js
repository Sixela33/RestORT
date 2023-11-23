
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
            
        } catch (error) {
            console.error('Error al ejecutar las migraciones:', error);
        }
    }

    // --------------------[USUARIOS]--------------------

    getUsuarios = async (documento) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        let res = []
        try {
            if (documento){
                res = await CnxPostgress.db.query("SELECT * FROM usuarios WHERE documento = $1;", [documento])
            } else {
                res = await CnxPostgress.db.query('SELECT * FROM usuarios')
            }
            
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw { status: 500, error: error };
        }

        return res.rows
    }

    crearUsuario = async (documento, nombre, contrasena, esAdmin, esSuperUser) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")

        if(!esAdmin) esAdmin = false
        if(!esSuperUser) esSuperUser = false

        try {
            CnxPostgress.db.query("INSERT INTO usuarios (documento, nombre, contrasena, esAdmin, esSuperUser) VALUES ($1, $2, $3, $4, $5);",
            [documento, nombre, contrasena, esAdmin, esSuperUser])
            
        } catch (error) {
            console.error('Error \n', error);
            throw { status: 500, error: error };
        }
        
    }

    getUsuarioXdocumento = async (documento) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        try {
            const res = await CnxPostgress.db.query("SELECT * FROM usuarios WHERE documento = $1;", [documento])
            return res.rows[0]
    
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw { status: 500, error: error };
        }
    }

    hacerAdmin = async (id) => {
        try {
            await CnxPostgress.db.query("UPDATE usuarios SET esAdmin = true WHERE userID = $1;", [id])
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw { status: 500, error: error };
        }
    }

    quitarAdmin = async (id) => {
        try {
            await CnxPostgress.db.query("UPDATE usuarios SET esAdmin = false WHERE userID = $1;", [id])
            
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw { status: 500, error: error };
        }
    }

    // --------------------[INSUMOS]--------------------

    crearInsumo = async (nombre, cantidad, costoXunidad, unidadDeMedida) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        try {
            CnxPostgress.db.query("INSERT INTO insumos (nombre, cantidad, costoXunidad, unidadDeMedida) VALUES ($1, $2, $3, $4);",
            [nombre, cantidad, costoXunidad, unidadDeMedida])
            
        } catch (error) {
            console.error('Error \n', error);
            throw { status: 500, error: error };
            
        }
    }

    traerInsumos = async (id) => {
        if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")
        let res = []
        try {
            if (id){
                res = await CnxPostgress.db.query("SELECT * FROM insumos WHERE insumoID = $1;", [id])
            } else {
                res = await CnxPostgress.db.query("SELECT * FROM insumos;")
            }
            
        } catch (error) {
            console.error('Error \n', error);
            throw { status: 500, error: error };
        }
        
        return res.rows
    }

    editarInsumoxID = async (id, nombre, cantidad, costoXunidad, unidadDeMedida) => {
        if (!CnxPostgress.connection) throw new Error("No se estableció la conexión con la base de datos");
        try {
            const existeInsumo = await CnxPostgress.db.query("SELECT * FROM insumos WHERE insumoID = $1;", [id]);
    
            if (existeInsumo.rows.length === 0) {
                throw { message: "No se encontró el insumo con el ID proporcionado", status: 404 }
            }
    
            const resultado = await CnxPostgress.db.query(
                "UPDATE insumos SET nombre = $2, cantidad = $3, costoXunidad = $4, unidadDeMedida = $5 WHERE insumoID = $1 RETURNING *;",
                [id, nombre, cantidad, costoXunidad, unidadDeMedida]
            );
            
        } catch (error) {
            console.error('Error \n', error);
            throw { status: 500, error: error };
            
        }

        return resultado.rows[0]
    }

    eliminarInsumo = async (id) => {
        if (!CnxPostgress.connection) throw new Error("No se estableció la conexión con la base de datos");
        try {

            await CnxPostgress.db.query("DELETE FROM insumo WHERE insumoID = $1;", [id])
            
        } catch (error) {
            console.error('Error \n', error);
            throw { status: 500, error: error };
        }

    }

    // --------------------[PLATILLOS]--------------------

    crearPlatillo = async (insumos, nombre, valor) => {
        if (!CnxPostgress.connection) throw new Error("No se estableció la conexión con la base de datos");
        try {
            const ingredientes = insumos.map(par => par[0]);
            const cantidad = insumos.map(par => par[1]);
    
            await CnxPostgress.db.query(
                'CALL AgregarIngredientesAlMenu($1, $2, $3, $4)',
                [nombre,valor, ingredientes, cantidad]
            )
            
        } catch (error) {
            console.error('Error \n', error);
            throw { status: 500, error: error };
            
        }
    }

    getPlatilos = async (id) => {
        if (!CnxPostgress.connection) throw new Error("No se estableció la conexión con la base de datos");
        try {
            if (id) {
                res = await CnxPostgress.db.query("SELECT * FROM platillos WHERE platilloID = $1;", [id])
            } else {
                res = await CnxPostgress.db.query("SELECT * FROM platillos;")
            }
            
        } catch (error) {
            console.error('Error \n', error);
            throw { status: 500, error: error };

        }

        return resultado.rows
    }

    // --------------------[TICKETS]--------------------

    crearTicket = async (platillos, activo) => {
        if (!CnxPostgress.connection) throw new Error("No se estableció la conexión con la base de datos");

        try {
            const platillo = platillos.map(par => par[0]);
            const cantidad = platillos.map(par => par[1]);

            await CnxPostgress.db.query(
                'CALL crearTicket($1, $2, $3)',
                [platillo, cantidad, activo]
            )
        } catch (error) {
            console.error('Error \n', error);
            throw { status: 500, error: error };

        }
        
    }

    obtenerTicketsXRangoFecha = async (fecha1, fecha2) => {
        if (!CnxPostgress.connection) throw new Error("No se estableció la conexión con la base de datos");
        try {
    
            const query = `
                SELECT t.ticketID, t.fechaEmision, p.nombre AS nombre_platillo, dt.cantidad, p.valor * dt.cantidad AS valor_total
                FROM tickets t
                JOIN DetallesTicket dt ON t.ticketID = dt.id_ticket
                JOIN platillos p ON dt.id_platillo = p.platilloID
                WHERE t.fechaEmision BETWEEN TO_DATE('2023-11-23', 'YYYY-MM-DD') AND TO_DATE('2023-11-23', 'YYYY-MM-DD');`
     
            
            console.log(typeof fecha1)
            console.log(fecha2)

            const resultado = await CnxPostgress.db.query(query, [fecha1, fecha2])

            console.log(resultado)
            return resultado

        } catch (error) {
            console.error('Error \n', error);
            throw { status: 500, error: error };
        }
    }
}

export default ModeloPostgres